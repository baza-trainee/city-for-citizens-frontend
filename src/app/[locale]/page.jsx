import { Footer, Header } from '@/components/common';
import ModalCookies from '@/components/common/modal-cookies';
import ScrollToTopButton from '@/components/scroll-to-top-button';
import {
  AnalyticsBar,
  Filters,
  Gallery,
  Hero,
  Partners,
  ProposeEvent,
} from '@/components/sections-main-page';
import NextThemeProvider from '@/providers/theme-providers';

import { unstable_setRequestLocale } from 'next-intl/server';

import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(
  () =>
    import('@/components/sections-main-page/interactive-map/interactive-map'),
  {
    ssr: false,
  }
);

export default async function IndexPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <NextThemeProvider>
      <div className="dark:bg-dark-primary dark:text-dark-head">
        <Header />
        <main>
          <Hero />
          <AnalyticsBar />
          <Filters />
          <InteractiveMap />
          <Gallery />
          <Partners />
          <ProposeEvent />
          <ModalCookies />
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </NextThemeProvider>
  );
}
