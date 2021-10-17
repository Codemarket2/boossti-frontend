import { S3Client } from '@aws-sdk/client-s3';

const credentials = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
};

const s3Config = {
  region: 'us-east-1',
  credentials,
};

export const s3 = new S3Client(s3Config);
