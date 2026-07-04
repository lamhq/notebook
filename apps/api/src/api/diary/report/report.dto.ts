import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({ description: 'Name of the report' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Bank transfer QR code image URL' })
  @IsOptional()
  @IsUrl()
  paymentQR: string;

  @ApiProperty({ description: 'Filter activities by text' })
  @IsOptional()
  text?: string;

  @ApiProperty({ description: 'Filter activities by tags' })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({ description: 'Filter activities by date range' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  from?: Date;

  @ApiProperty({ description: 'Filter activities by date range' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  to?: Date;
}
