import {ThemeProvider} from '@emotion/react';
import {AppProps} from 'next/app';

import {theme, GlobalStyles, PageLayout} from '@src/shared';

import '../public/fonts/index.css';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ThemeProvider>
  );
};

export default App;
