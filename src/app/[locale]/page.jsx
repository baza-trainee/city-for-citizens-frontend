import { Footer, Header } from '@/components/common';
import {
  AnalyticsBar,
  Filters,
  Gallery,
  Hero,
  Partners,
  InteractiveMap,
  ProposalForm,
} from '@/components/sections-main-page';
import NextThemeProvider from '@/providers/theme-providers';

import { unstable_setRequestLocale } from 'next-intl/server';

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
        </main>
        <Footer />
      </div>
    </NextThemeProvider>
  );
}
