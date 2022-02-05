import Head from 'next/head';
import projectConfig from '@frontend/shared';

interface IProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function HeadComponent({
  title = projectConfig.title,
  description = projectConfig.description,
  image = projectConfig.image,
  url = projectConfig.url,
}: IProps) {
  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="og-title" property="og:title" content={title} />
      <meta key="description" property="og:description" content={description} />
      <meta key="image" property="og:image" content={image} />
      <meta key="url" property="og:url" content={url} />
      <meta key="twitter-card" name="twitter:card" content="summary_large_image" />
      <meta key="site-name" property="og:site_name" content={title} />
      <meta key="twitter-title" name="twitter:image:alt" content={title} />
    </Head>
  );
}
