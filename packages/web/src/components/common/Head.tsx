import Head from 'next/head';
import projectConfig from '@frontend/shared';

interface IProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function HeadComponent({ title, description, image, url }: IProps) {
  return (
    <Head>
      <title key="title">{title || projectConfig.title}</title>
      <meta key="og-title" property="og:title" content={title || projectConfig.title} />
      <meta
        key="description"
        property="og:description"
        content={description || projectConfig.description}
      />
      <meta key="image" property="og:image" content={image || projectConfig.image} />
      <meta key="url" property="og:url" content={url || projectConfig.url} />
      <meta key="twitter-card" name="twitter:card" content="summary_large_image" />
      <meta key="site-name" property="og:site_name" content={title || projectConfig.title} />
      <meta key="twitter-title" name="twitter:image:alt" content={title || projectConfig.title} />
    </Head>
  );
}
