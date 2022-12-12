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
      <Html lang="ko">
        <Head>
          {/* FONTS */}
          <link rel="stylesheet" href="/fonts/index.css" />
          {/* MARKDOWN : PRISM */}
          <link
            href={`https://unpkg.com/prismjs@0.0.1/themes/prism-${prismTheme}.css`}
            rel="stylesheet"
          />
          {/* DEFAULT */}
          <link rel="icon" href="/favicon.ico" />
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
