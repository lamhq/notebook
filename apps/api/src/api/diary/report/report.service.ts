import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns/format';
import { mdToPdf } from 'md-to-pdf';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { S3Service } from '../../common/services/s3.service';
import { slugify } from '../../common/utils';
import { Activity } from '../activity/activity.entity';
import { ActivityService } from '../activity/activity.service';
import { CreateReportDto } from './report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private reportRepo: MongoRepository<Report>,
    private readonly configService: ConfigService,
    private readonly activityService: ActivityService,
    private readonly s3Service: S3Service,
  ) {}

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
    const [transactions] = await this.activityService.findAll({
      offset: 0,
      limit: 1000,
      text: dto.text,
      tags: dto.tags,
      from: dto.from,
      to: dto.to,
    });

    // Generate PDF buffer from markdown
    const markdown = this.generateMarkdown(dto.name, dto.paymentQR, transactions);
    const pdf = await mdToPdf({ content: markdown }, { document_title: dto.name });
    const pdfBuffer = pdf.content;

    // Upload PDF to S3
    const fileName = `${slugify(dto.name)}.pdf`;
    const s3Key = `media/reports/${Date.now().toString()}-${fileName}`;
    await this.s3Service.uploadBuffer(s3Key, pdfBuffer, 'application/pdf', fileName);
    const pdfUrl = `${this.configService.getOrThrow<string>('aws.cloudfrontUrl')}/${s3Key}`;

    // Save report to database
    const report = this.reportRepo.create({
      name: dto.name,
      pdfUrl,
      paymentQR: dto.paymentQR,
      filters: {
        text: dto.text,
        tags: dto.tags,
        from: dto.from,
        to: dto.to,
      },
      activities: transactions,
      createdAt: new Date(),
    });
    return this.reportRepo.save(report);
  }

  async delete(id: ObjectId): Promise<void> {
    const report = await this.findOneOrFail(id);

    // Delete PDF from S3
    if (report.pdfUrl) {
      const key = this.extractS3Key(report.pdfUrl);
      if (key) {
        await this.s3Service.deleteObject(key);
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
        return `| ${date} | ${t.content ?? ''} | ${amount.toLocaleString('vi-VN')} |`;
      })
      .join('\n');

    return `# ${name}

Tổng: ${total.toLocaleString('vi-VN')}

| Ngày | Nội dung | Số tiền |
| :---- | :-------- | -------: |
${rows}

![](${paymentQR})
`;
  }

  private extractS3Key(url: string): string | null {
    try {
      const u = new URL(url);
      return u.pathname.startsWith('/') ? u.pathname.slice(1) : u.pathname;
    } catch {
      return null;
    }
  }
}
