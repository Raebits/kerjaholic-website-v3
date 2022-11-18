import React from 'react';
import type { AppProps } from 'next/app';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import 'tailwindcss/tailwind.css';
import '../public/css/globals.css'
import { appWithTranslation } from 'next-i18next'
import ContextProvider from '../utils/context/context-provider';
import { GoogleOAuthProvider } from '@react-oauth/google';

function MyApp({ Component, pageProps }: AppProps) {
  
  React.useEffect(() => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
          jssStyles.parentElement.removeChild(jssStyles);
      }
  }, []);

  return (
    <GoogleOAuthProvider clientId="17773254584-tv67vbs94kln4jvsj86q4setb5ee0uc5.apps.googleusercontent.com">
        <ContextProvider>
          <Component {...pageProps} />
      </ContextProvider>
    </GoogleOAuthProvider>
  )
}

export default appWithTranslation(MyApp)