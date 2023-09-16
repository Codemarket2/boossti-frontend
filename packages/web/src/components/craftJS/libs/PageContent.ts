// OTHERS
import lz from 'lzutf8';

// COMPRESSED VERSION

export const decodePageContent = (EncodedPageContent: string) => {
  return lz.decompress(lz.decodeBase64(EncodedPageContent));
};

export const encodePageContent = (DecodedPageContent: string) => {
  return lz.encodeBase64(lz.compress(DecodedPageContent));
};
