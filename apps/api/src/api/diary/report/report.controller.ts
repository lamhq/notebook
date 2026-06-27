import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { ParseObjectIDPipe } from '../../common/pipes/parse-object-id.pipe';
import { CreateReportDto } from './report.dto';
import { Report } from './report.entity';
import { ReportService } from './report.service';

@Controller('diary/reports')
@ApiTags('Diary')
@ApiUnauthorizedResponse({ description: 'Invalid or missing access token' })
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @ApiOperation({ summary: 'List all reports' })
  @ApiOkResponse({ type: Report, isArray: true })
  findAll(): Promise<Report[]> {
    return this.reportService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get report by id' })
  @ApiOkResponse({ type: Report })
  @ApiNotFoundResponse({ description: 'Report not found' })
  findOne(@Param('id', ParseObjectIDPipe) id: ObjectId): Promise<Report> {
    return this.reportService.findOneOrFail(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a report' })
  @ApiCreatedResponse({ type: Report })
  create(@Body() dto: CreateReportDto): Promise<Report> {
    return this.reportService.create(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a report' })
  @ApiNoContentResponse({ description: 'Report deleted' })
  @ApiNotFoundResponse({ description: 'Report not found' })
  async delete(@Param('id', ParseObjectIDPipe) id: ObjectId): Promise<void> {
    await this.reportService.delete(id);
  }
}
