import { ConfigFactory, ConfigObject } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  DatabaseConfig,
  configFactory as dbConfigFactory,
} from '../database/config';

export interface AppConfig extends ConfigObject {
  typeorm: TypeOrmModuleOptions & DatabaseConfig;
  aws: {
    region: string;
    s3Bucket: string;
    cloudfrontUrl?: string;
  };
}

export const configFactory: ConfigFactory<AppConfig> = () => {
  const { entities, ...dbConfig } = dbConfigFactory();

  const region = process.env.AWS_REGION;
  const s3Bucket = process.env.AWS_S3_BUCKET;
  const cloudfrontUrl = process.env.AWS_CLOUDFRONT_URL;

  if (!region) {
    throw new Error('Missing required environment variable: AWS_REGION');
  }

  if (!s3Bucket) {
    throw new Error('Missing required environment variable: AWS_S3_BUCKET');
  }

  if (!cloudfrontUrl) {
    throw new Error('Missing required environment variable: AWS_CLOUDFRONT_URL');
  }

  return {
    typeorm: {
      ...dbConfig,
      autoLoadEntities: true, // any entity registered through `forFeature()` will be automatically added to TypeORM entity list
    },
    aws: {
      region,
      s3Bucket,
      cloudfrontUrl,
    },
  };
};

export default configFactory;
