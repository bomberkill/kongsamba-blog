import '@mantine/core/styles.css';

import { appWithTranslation } from 'next-i18next';

import '@mantine/carousel/styles.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import apolloClient from '@/lib/apolloClient';
import { theme } from '../theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Head>
          {/* <title>Kongsamba Hip-Hop Mag</title> */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <meta charSet="UTF-8" />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ApolloProvider>
    </MantineProvider>
  );
}
export default appWithTranslation(App);
