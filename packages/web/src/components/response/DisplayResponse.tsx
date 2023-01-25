import Head from 'next/head';
// import { Document } from 'next/document';
import projectConfig from '@frontend/shared';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface IProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

interface IImageElement extends HTMLImageElement {
  src: string;
}
export default function HeadComponent({ title, description, image, url }: IProps) {
  const [state, setState] = useState({
    title: title || projectConfig.title,
    description: description || projectConfig.description,
    image: image || projectConfig.image,
    url: url ? `${projectConfig.url}${url}` : projectConfig.url,
  });

  const [firstLoadedImage, setFirstLoadedImage] = useState('');

  useEffect(() => {
    const images: HTMLCollectionOf<IImageElement> = document.getElementsByTagName('img');
    if (images.length > 0) {
      setFirstLoadedImage(images[0].src);
      // console.log(images);
    }
  }, []);
  //   useEffect(() => {
  //     const images: HTMLCollectionOf<IImageElement> = document.getElementsByTagName('img');
  //     for (let i = 0; i < images.length; i += 1) {
  //       console.log(images[i].src);
  //       if (i === 0) {
  //         setFirstLoadedImage(images[i].src);
  //       }
  //     }
  //   }, []);

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
    <Head>
      <title key="title">{state.title}</title>
      <meta key="description" name="description" content={state.description} />
      {/* <meta key="og-title" property="og:title" content={state.title} /> */}
      {/* <meta key="og-description" property="og:description" content={state.description} /> */}
      {/* <meta key="og-description" property="og:description" content={state.description} /> */}
      {/* <meta key="og-image" property="og:image" content={state.image} /> */}
      <meta key="og-image" property="og:image" content={firstLoadedImage} />

      <meta key="og-type" property="og:type" content="article" />
      <meta key="og-url" property="og:url" content={state.url} />
      <meta key="site-name" property="og:site_name" content={state.title} />
      <meta key="twitter-card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter-title" property="twitter:title" content={state.title} />
      <meta key="twitter-description" property="twitter:description" content={state.description} />
      <meta key="twitter-image" property="twitter:image" content={state.image} />
      <meta key="twitter-url" property="twitter:url" content={state.url} />
    </Head>
  );
}
