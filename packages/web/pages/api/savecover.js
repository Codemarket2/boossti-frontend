import fs from 'fs';
import formidable from 'formidable';
import { v4 as uuid } from 'uuid';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import awsConfig from '@frontend/shared/aws-exports';
import { s3 } from '../../src/utils/s3Client';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = awsConfig;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  try {
    console.log('image upload request /api/savecover');
    const data = await new Promise(function (resolve, reject) {
      const form = new formidable.IncomingForm({ keepExtensions: true });
      form.parse(req, function (err, fields, files) {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
    const files = (await data).files;
    // console.log(files.fileCover);
    const imageFile = files.fileCover;
    let fileStream = fs.createReadStream(imageFile.path);
    // AWS SDK S3
    const extension = imageFile.type.split('/')[1];
    let key = `media/testing/${uuid()}${+new Date()}.${extension}`;
    let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
    const params = {
      Bucket: bucket,
      Key: `public/${key}`,
      Body: fileStream,
      ContentType: imageFile.type,
      ACL: 'public-read',
    };
    await s3.send(new PutObjectCommand(params));
    console.log(url);
    const html = `<html><body onload="parent.applyBoxImage('${url}')"></body></html>`;
    return res.status(200).send(html);
  } catch (error) {
    console.log('error', error.message);
    return res
      .status(400)
      .send(
        `<html><body onload="alert('Saving image to server failed ${error.message}')"></body></html>`,
      );
  }
};
