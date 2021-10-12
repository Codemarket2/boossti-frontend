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
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:image:alt" content={title} />
    </Head>
  );
}
