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
    <>
      {title || description || image || url ? (
        <Head>
          <title>{(title && title) || projectConfig.title}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:title" content={(title && title) || projectConfig.title} />
          <meta
            property="og:description"
            content={(description && description) || projectConfig.description}
          />
          <meta property="og:image" content={(image && image) || projectConfig.image} />
          <meta property="og:url" content={(url && url) || projectConfig.url} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:site_name" content={(title && title) || projectConfig.title} />
          <meta name="twitter:image:alt" content={(title && title) || projectConfig.title} />
        </Head>
      ) : (
        <Head>
          <title>{projectConfig.title}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:title" content={projectConfig.title} />
          <meta property="og:description" content={projectConfig.description} />
          <meta property="og:image" content={projectConfig.image} />
          <meta property="og:url" content={projectConfig.url} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:site_name" content={projectConfig.title} />
          <meta name="twitter:image:alt" content={projectConfig.title} />
        </Head>
      )}
    </>
  );
}
