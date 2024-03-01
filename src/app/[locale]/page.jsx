// import { Footer, Header } from '@/components/common';
import {
  // AnalyticsBar,
  // Filters,
  Gallery,
  // Hero,
  // Partners,
  // InteractiveMap,
  // ProposalForm,
} from '@/components/sections-main-page';

import { unstable_setRequestLocale } from 'next-intl/server';

export default async function IndexPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <>
      {/* <Header /> */}
      <main>
        {/* <Hero />
        <AnalyticsBar />
        <Filters />
        <InteractiveMap /> */}
        <Gallery />
        {/* <Partners />
        <ProposalForm /> */}
      </main>
      {/* <Footer /> */}
    </>
  );
}
