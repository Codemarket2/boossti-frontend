/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { Storage } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import config from '../aws-exports';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

export const fileUpload = async (files: any, path = '/common', compressedFile?: any) => {
  try {
    const urls = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      const name = file.name.split('.')[0];
      const { type: mimeType } = file;
      const type = mimeType.split('/').shift();
      const extension = mimeType.split('/').pop();
      const key = `media${path}/${type}-${uuid()}${+new Date()}name-${name}.${extension}`;
      let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
      if (compressedFile) {
        file = await compressedFile(file);
      }
      // check for svg
      if (url.includes('.svg+xml')) {
        url = url.replace(/(svg)\+(xml)/g, '$1%2B$2');
      }
      await Storage.put(key, file, {
        contentType: mimeType,
      });

      urls.push(url);
    }
    return urls;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('file upload error', error.message);
    throw error;
  }
};

export const getFileName = (url: string): string => {
  return url?.split('/')?.pop()?.split('name-')?.pop();
};

// export const makeCopyOfFiles = async (urls: any[]) => {
//   const newUrls = [];
//   for (const url of urls) {
//     const oldKey = url.split('.amazonaws.com/public/')?.pop();
//     await Storage.copy({ key: 'src' }, { key: 'dest' });
//   }
// };
