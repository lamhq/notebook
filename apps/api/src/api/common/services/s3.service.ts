import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly bucketName: string;
  private readonly region: string;

  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.getOrThrow<string>('aws.region');
    this.bucketName = this.configService.getOrThrow<string>('aws.s3Bucket');
    this.s3 = new S3Client({
      region: this.region,
    });
  }

  /**
   * Upload a Buffer to S3
   * @param key - The object key (path/filename in S3)
   * @param buffer - The file content as Buffer
   * @param contentType - MIME type of the file
   * @param downloadName - Optional: custom filename for download
   */
  async uploadBuffer(
    key: string,
    buffer: Buffer,
    contentType: string,
    downloadName?: string,
  ): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ContentDisposition: downloadName
        ? `attachment; filename="${downloadName}"`
        : undefined,
    });

    await this.s3.send(command);
  }

  /**
   * Delete an object from S3
   * @param key - The object key to delete
   */
  async deleteObject(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    await this.s3.send(command);
  }
}
