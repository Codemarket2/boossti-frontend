import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import projectConfig from '@frontend/shared';

import { useSelector } from 'react-redux';

interface IProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  children?: React.ReactNode;
}

export default function HeadComponent({ title, description, image, url, children }: IProps) {
  const [state, setState] = useState({
    title: title || projectConfig.title,
    description: description || projectConfig.description,
    image: image || projectConfig.image,
    url: url ? `${projectConfig.url}${url}` : projectConfig.url,
  });
  const settings = useSelector(({ setting }: any) => setting);
  useEffect(() => {
    if (settings?.isApp && settings?.appName) {
      setState((oldState) => ({
        ...oldState,
        title: settings?.appName,
        description: settings?.appName,
        url: location?.origin,
      }));
    }
  }, [settings?.appName]);

  return (
    <>
      <Head>
        <title key="title">{state.title}</title>
        <meta key="description" name="description" content={state.description} />
        <meta key="og-title" property="og:title" content={state.title} />
        <meta key="og-description" property="og:description" content={state.description} />
        <meta key="og-image" property="og:image" content={state.image} />
        <meta key="og-type" property="og:type" content="article" />
        <meta key="og-url" property="og:url" content={state.url} />
        <meta key="site-name" property="og:site_name" content={state.title} />
        <meta key="twitter-card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter-title" property="twitter:title" content={state.title} />
        <meta
          key="twitter-description"
          property="twitter:description"
          content={state.description}
        />
        <meta key="twitter-image" property="twitter:image" content={state.image} />
        <meta key="twitter-url" property="twitter:url" content={state.url} />
      </Head>
      <main>{children}</main>
    </>
  );
}
