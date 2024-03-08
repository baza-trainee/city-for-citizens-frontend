import { Footer, Header } from '@/components/common';
import ModalCookies from '@/components/common/modal-cookies';
import {
  AnalyticsBar,
  Filters,
  Gallery,
  Hero,
  Partners,
  ProposalForm,
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
          <ProposalForm />
          <ModalCookies />
        </main>
        <Footer />
      </div>
    </NextThemeProvider>
  );
}
