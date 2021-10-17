import Cors from 'cors';
import formidable from 'formidable';
import { v4 as uuid } from 'uuid';
import awsConfig from '@frontend/shared/aws-exports';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { initMiddleware } from '../../src/utils/initMiddleware';
import { s3 } from '../../src/utils/s3Client';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = awsConfig;

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS'],
  }),
);

export default async (req, res) => {
  try {
    console.log('image upload request /api/saveimage');
    await cors(req, res);
    const data = await new Promise(function (resolve, reject) {
      const form = new formidable.IncomingForm({ keepExtensions: true });
      form.parse(req, function (err, fields, files) {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
    // const response = await data;
    const formFields = (await data).fields;
    console.log(Object.keys(formFields));
    const count = formFields.count;
    const base64Data = formFields['hidimg-' + count];
    const filename = formFields['hidname-' + count];
    const imgtype = formFields['hidtype-' + count];
    const buf = Buffer.from(base64Data.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    // AWS SDK S3
    let key = `media/testing/${uuid()}${+new Date()}.jpeg`;
    let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
    const params = {
      Bucket: bucket,
      Key: `public/${key}`,
      Body: buf,
      ContentType: 'image/jpeg',
      ACL: 'public-read',
    };
    // const uploadRes = await s3.putObject(params).promise();
    const uploadRes = await s3.send(new PutObjectCommand(params));
    console.log('uploadRes', uploadRes);
    console.log(url);
    const html = `<html><body onload="parent.document.getElementById('img-${count}').setAttribute('src','${url}');  parent.document.getElementById('img-${count}').removeAttribute('id') "></body></html>`;
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
