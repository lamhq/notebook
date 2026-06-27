import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Activity, ActivityQuery } from '../activity/activity.entity';

@Entity({ name: 'reports' })
export class Report {
  @ObjectIdColumn()
  @Transform((data) => (data.value as ObjectId).toString())
  @Expose()
  id: ObjectId;

  @Expose()
  @Column()
  @ApiProperty({ description: 'Name of the report' })
  name: string;

  @Expose()
  @Column()
  @ApiProperty({ description: 'Bank transfer QR code image URL' })
  paymentQR: string;

  @Expose()
  @Column()
  @ApiProperty({ description: 'Filter conditions used to generate the report' })
  filters: ActivityQuery;

  @Expose()
  @Column()
  @ApiProperty({ description: 'Transactions included in the report' })
  activities: Activity[];

  @Expose()
  @Column()
  @ApiProperty({ description: 'Public S3 URL of the generated PDF' })
  pdfUrl: string;

  @Expose()
  @Column()
  @ApiProperty({ description: 'When the report was created' })
  createdAt: Date;

  constructor(data: Partial<Report>) {
    Object.assign(this, data);
  }
}
