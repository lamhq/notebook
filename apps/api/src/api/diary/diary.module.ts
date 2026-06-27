import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityController } from './activity/activity.controller';
import { Activity } from './activity/activity.entity';
import { ActivityService } from './activity/activity.service';
import { ReportController } from './report/report.controller';
import { Report } from './report/report.entity';
import { ReportService } from './report/report.service';
import { StatController } from './stat/stat.controller';
import { StatService } from './stat/stat.service';
import { TagController } from './tag/tag.controller';
import { Tag } from './tag/tag.entity';
import { TagService } from './tag/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, Tag, Report])],
  controllers: [ActivityController, TagController, StatController, ReportController],
  providers: [ActivityService, TagService, StatService, ReportService],
})
export class DiaryModule {}
