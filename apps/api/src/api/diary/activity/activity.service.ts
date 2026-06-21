import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository, ObjectLiteral } from 'typeorm';
import { MongoFindManyOptions } from 'typeorm/find-options/mongodb/MongoFindManyOptions';
import { CreateActivityDto, UpdateActivityDto } from './activity.dto';
import { Activity, ActivityQuery } from './activity.entity';
import {
  ACTIVITY_CREATED_EVENT,
  ACTIVITY_REMOVED_EVENT,
  ACTIVITY_UPDATED_EVENT,
  ActivityCreatedEvent,
  ActivityRemovedEvent,
  ActivityUpdatedEvent,
} from './activity.event';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity) private activityRepo: MongoRepository<Activity>,
    private eventEmitter: EventEmitter2,
  ) {}

  async findAll(query: ActivityQuery): Promise<[Activity[], number]> {
    const filter: MongoFindManyOptions<Activity> = {
      skip: query.offset,
      take: query.limit,
      withDeleted: false,
      order: {
        time: 'DESC',
      },
    };

    filter.where = {};

    if (query.text) {
      filter.where = {
        ...filter.where,
        $text: { $search: query.text },
      };
    }

    if (query.tags) {
      filter.where = {
        ...filter.where,
        tags: { $elemMatch: { $in: query.tags } },
      };
    }

    if (query.from || query.to) {
      const range: ObjectLiteral = {};
      if (query.from) {
        range.$gt = query.from;
      }
      if (query.to) {
        range.$lt = query.to;
      }
      filter.where = {
        ...filter.where,
        time: range,
      };
    }

    return this.activityRepo.findAndCount(filter);
  }

  async findOneByIdOrFail(id: ObjectId): Promise<Activity> {
    const activity = await this.activityRepo.findOneBy(id);
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }
    return activity;
  }

  async delete(id: ObjectId): Promise<void> {
    const activity = await this.findOneByIdOrFail(id);
    this.eventEmitter.emit(
      ACTIVITY_REMOVED_EVENT,
      new ActivityRemovedEvent({ activity }),
    );
    await this.activityRepo.delete(new ObjectId(id));
  }

  async create(dto: CreateActivityDto): Promise<Activity[]> {
    if (!dto.splitByTag) {
      const entity = {
        content: dto.content,
        time: new Date(dto.time),
        tags: dto.tags.map((tag) => tag.toLowerCase().trim()),
        income: dto.income ? parseInt(dto.income) : undefined,
        outcome: dto.outcome ? parseInt(dto.outcome) : undefined,
      };
      const activity = await this.activityRepo.save(entity);
      this.eventEmitter.emit(
        ACTIVITY_CREATED_EVENT,
        new ActivityCreatedEvent({ activity }),
      );
      return [activity];
    }

    const baseEntity = {
      content: dto.content,
      time: new Date(dto.time),
      tags: dto.tags.map((tag) => tag.toLowerCase().trim()),
      income: dto.income ? parseInt(dto.income) : undefined,
      outcome: dto.outcome ? parseInt(dto.outcome) : undefined,
    };
    const normalizedTags = baseEntity.tags;
    const results: Activity[] = [];

    for (const tag of normalizedTags) {
      try {
        const entity = new Activity({
          content: baseEntity.content,
          time: baseEntity.time,
          income: baseEntity.income,
          outcome: baseEntity.outcome,
          tags: [tag],
        });
        const activity = await this.activityRepo.save(entity);
        this.eventEmitter.emit(
          ACTIVITY_CREATED_EVENT,
          new ActivityCreatedEvent({ activity }),
        );
        results.push(activity);
      } catch (error) {
        console.error(`Failed to create activity for tag "${tag}":`, error);
      }
    }

    return results;
  }

  async update(id: ObjectId, dto: UpdateActivityDto): Promise<Activity> {
    const before = await this.findOneByIdOrFail(id);
    const entity = {
      id: before.id,
      content: dto.content,
      time: new Date(dto.time),
      tags: dto.tags.map((tag) => tag.toLowerCase().trim()),
      income: dto.income ? parseInt(dto.income) : undefined,
      outcome: dto.outcome ? parseInt(dto.outcome) : undefined,
    };
    await this.activityRepo.replaceOne({ _id: entity.id }, entity);

    this.eventEmitter.emit(
      ACTIVITY_UPDATED_EVENT,
      new ActivityUpdatedEvent({ before, after: entity }),
    );
    return entity;
  }
}
