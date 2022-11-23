import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';

interface DocumentProps {}

type PrismThemeType = 'okaidia' | 'tomorrow' | 'coy' | 'funky';
class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }
  render() {
    const prismTheme: PrismThemeType = 'okaidia';
    return (
      <Html>
        <Head>
          {/* FONTS */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700&family=Poor+Story&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&display=swap"
            rel="stylesheet"
          />
          {/* MARKDOWN : PRISM */}
          <link
            rel="preload"
            href="https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css"
            as="script"
          />
          <link
            rel="preload"
            href="https://unpkg.com/prismjs@0.0.1/themes/prism-coy.css"
            as="script"
          />
          <link
            rel="preload"
            href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
            as="script"
          />
          <link
            rel="preload"
            href="https://unpkg.com/prismjs@0.0.1/themes/prism-funky.css"
            as="script"
          />
          <link
            href={`https://unpkg.com/prismjs@0.0.1/themes/prism-${prismTheme}.css`}
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
