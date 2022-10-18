import React from 'react';
import type { AppProps } from 'next/app';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import 'tailwindcss/tailwind.css';
import '../public/css/globals.css'
import { appWithTranslation } from 'next-i18next'
import ContextProvider from '../utils/context/context-provider';

function MyApp({ Component, pageProps }: AppProps) {
  
  React.useEffect(() => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
          jssStyles.parentElement.removeChild(jssStyles);
      }
  }, []);

  return (
      <ContextProvider>
          <Component {...pageProps} />
      </ContextProvider>
  )
}

export default appWithTranslation(MyApp)