import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns/format';
import { mdToPdf } from 'md-to-pdf';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { Activity } from '../activity/activity.entity';
import { ActivityService } from '../activity/activity.service';
import { CreateReportDto } from './report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportService {
  private s3Client: S3Client;
  private bucketName: string;
  private s3PublicBaseUrl: string;

  constructor(
    @InjectRepository(Report) private reportRepo: MongoRepository<Report>,
    private readonly activityService: ActivityService,
  ) {
    this.bucketName = process.env.S3_BUCKET ?? '';
    this.s3PublicBaseUrl = process.env.S3_PUBLIC_BASE_URL ?? '';
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION ?? 'us-east-1',
    });
  }

  async findAll(): Promise<Report[]> {
    return this.reportRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOneOrFail(id: ObjectId): Promise<Report> {
    const report = await this.reportRepo.findOneBy(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }

  async create(dto: CreateReportDto): Promise<Report> {
    // TODO: find the activities based on the filters provided in the dto
    const [transactions] = await this.activityService.findAll({
      offset: 0,
      limit: 1000,
      ...dto.filters,
    });
    const markdown = this.generateMarkdown(dto.name, dto.paymentQR, transactions);
    const pdfBuffer = await this.generatePdf(markdown);
    const pdfKey = `reports/${Date.now().toString()}-${dto.name.replace(/\s+/g, '-')}.pdf`;
    const pdfUrl = await this.uploadPdfToS3(pdfBuffer, pdfKey);
    const report = this.reportRepo.create({
      name: dto.name,
      paymentQR: dto.paymentQR,
      filters: dto.filters,
      activities: transactions,
      pdfUrl,
      createdAt: new Date(),
    });
    return this.reportRepo.save(report);
  }

  async delete(id: ObjectId): Promise<void> {
    const report = await this.findOneOrFail(id);

    // Delete PDF from S3
    if (report.pdfUrl && this.bucketName) {
      const key = this.extractS3Key(report.pdfUrl);
      if (key) {
        await this.s3Client.send(
          new DeleteObjectCommand({ Bucket: this.bucketName, Key: key }),
        );
      }
    }

    await this.reportRepo.delete(new ObjectId(id));
  }

  private generateMarkdown(
    name: string,
    paymentQR: string,
    transactions: Activity[],
  ): string {
    const total =
      transactions.reduce((sum, t) => {
        if (t.income) return sum - t.income;
        if (t.outcome) return sum + t.outcome;
        return sum;
      }, 0) * 1000;

    const rows = transactions
      .map((t) => {
        const date = format(t.time, 'dd/MM HH:mm');
        const income = t.income ?? 0;
        const outcome = t.outcome ?? 0;
        const amount = (outcome - income) * 1000;
        return `| ${date} | ${t.content ?? ''} | ${amount.toString()} |`;
      })
      .join('\n');

    return `# ${name}

Tổng: ${total.toString()}

| Ngày | Nội dung | Số tiền |
| ---- | -------- | ------- |
${rows}

![QR code for bank transfer](${paymentQR})
`;
  }

  private async generatePdf(markdown: string): Promise<Buffer> {
    const pdf = await mdToPdf({ content: markdown });
    return pdf.content;
  }

  private async uploadPdfToS3(buffer: Buffer, key: string): Promise<string> {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: 'application/pdf',
      }),
    );
    return `${this.s3PublicBaseUrl}/${key}`;
  }

  private extractS3Key(url: string): string | null {
    if (!this.s3PublicBaseUrl) return null;
    const prefix = `${this.s3PublicBaseUrl}/`;
    if (url.startsWith(prefix)) {
      return url.slice(prefix.length);
    }
    return null;
  }
}
