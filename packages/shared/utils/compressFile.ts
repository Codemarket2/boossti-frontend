// eslint-disable-next-line import/no-extraneous-dependencies
import Compress from 'browser-image-compression';

const options = {
  maxSizeMB: 0.1,
  maxIteration: 70,
  useWebWorker: true,
};

export const compressedFile = async (file) => {
  const newFile = await Compress(file, options);
  return newFile;
};
