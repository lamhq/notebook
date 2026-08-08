import { Module } from '@nestjs/common';
import { S3Service } from './services/s3.service';
import { UtilsService } from './services/utils.service';

@Module({
  providers: [S3Service, UtilsService],
  exports: [S3Service, UtilsService],
})
export class CommonModule {}
