import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';
import { ActivityQuery } from '../activity/activity.entity';

export class CreateReportDto {
  @ApiProperty({ description: 'Name of the report' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Bank transfer QR code image URL' })
  @IsNotEmpty()
  @IsUrl()
  paymentQR: string;

  @ApiProperty({ description: 'Filter conditions' })
  filters: ActivityQuery;
}
