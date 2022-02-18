import Head from 'next/head';
import projectConfig from '@frontend/shared';

interface IProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function HeadComponent({ title, description, image, url }: IProps) {
  const sTitle = title || projectConfig.title;
  const sDescription = description || projectConfig.description;
  const sImage = image || projectConfig.image;
  const sUrl = url ? `${projectConfig.url}${url}` : projectConfig.url;
  return (
    <Head>
      <title key="title">{sTitle}</title>
      <meta key="description" name="description" content={sDescription} />
      <meta key="og-title" property="og:title" content={sTitle} />
      <meta key="og-description" property="og:description" content={sDescription} />
      <meta key="og-image" property="og:image" content={sImage} />
      <meta key="og-type" property="og:type" content="article" />
      <meta key="og-url" property="og:url" content={sUrl} />
      <meta key="site-name" property="og:site_name" content={sTitle} />
      <meta key="twitter-card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter-title" property="twitter:title" content={sTitle} />
      <meta key="twitter-description" property="twitter:description" content={sDescription} />
      <meta key="twitter-image" property="twitter:image" content={sImage} />
      <meta key="twitter-url" property="twitter:url" content={sUrl} />
    </Head>
  );
}
