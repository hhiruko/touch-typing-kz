import CBody from '@src/components/container-body';
import '../styles/globals.scss';
import ConfigProvider from '@src/hooks/use-config';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '@src/components/footer';
import { SafeHydrate } from '@src/utils/ssr-utils';

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) => {
  const router = useRouter();

  const handleRouteChange = (url: string) => {
    // @ts-ignore
    if (window && window.gtag) {
      // @ts-ignore
      window.gtag('config', 'G-QW6470DZ7Z', {
        page_path: url,
      });
    }
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ConfigProvider>
      <div
        className="fixed z-[999] w-full h-full left-0 top-0 bg-[#777]"
        id="loader"
      />
      <ToastContainer />
      <Head>
        <title>Touch Typing</title>
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="A complete platform to learn typings and to practice your typing skills. Learn to type faster, get better at typing guru, and improve your typing skills."
        />

        <link rel="icon" href="/touch.png" />
        <link rel="apple-touch-icon" href="/touch.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="hidden md:block">
        <Component {...pageProps} />
      </div>
      <div className="md:hidden">
        <CBody className="flex justify-center items-center min-h-screen text-primary bg-background">
          <div className="max-w-xs tracking-wide text-lg leading-relaxed">
            Please open in your desktop device or rotate your phone.
            <br />
            <br />
            Use external keyboard if you want to practice in your phone.
          </div>
        </CBody>
      </div>
      <Footer />
    </ConfigProvider>
  );
};

export default MyApp;
