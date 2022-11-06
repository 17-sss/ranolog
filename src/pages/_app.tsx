import {ThemeProvider} from '@emotion/react';
import {AppProps} from 'next/app';

import {theme, GlobalStyles} from '@shared';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
