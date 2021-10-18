import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';

import { resetServerContext } from 'react-beautiful-dnd';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new StyledComponentSheets();
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      resetServerContext();
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentSheet.collectStyles(materialUiSheets.collect(<App {...props} />)),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentSheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          /> */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
          <link
            href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i&display=swap"
            rel="stylesheet"
          />
          <link href="/box/box.css" rel="stylesheet" type="text/css" />
          <link href="/assets/minimalist-blocks/content.css" rel="stylesheet" type="text/css" />
          <link
            href="/assets/scripts/simplelightbox/simplelightbox.css"
            rel="stylesheet"
            type="text/css"
          />
          <link href="/contentbuilder/contentbuilder.css" rel="stylesheet" type="text/css" />
          <link href="/contentbox/contentbox.css" rel="stylesheet" type="text/css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://code.jquery.com/jquery-3.4.1.min.js" type="text/javascript" />
          <script
            src="/assets/scripts/simplelightbox/simple-lightbox.min.js"
            type="text/javascript"
          />
          <script src="/assets/minimalist-blocks/content.js" type="text/javascript" />
          <script src="/contentbuilder/contentbuilder.min.js" type="text/javascript" />
          <script src="/contentbox/contentbox.min.js" type="text/javascript" />
          <script src="/box/box.js" type="text/javascript" />
        </body>
      </Html>
    );
  }
}
