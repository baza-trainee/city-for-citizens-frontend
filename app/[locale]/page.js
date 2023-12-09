import { locales } from '@/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import Footer from '@/components/Footer';
import FilteredMap from '@/components/GoogleMaps/FilteredMap';
import Hero from '@/components/Hero';
import Header from '@/components/header/Header';
import ModalCookies from '@/components/cookies/ModalCookies';

export default function IndexPage({ params: { locale } }) {
  const isValidLocale = locales.some(cur => cur === locale);
  if (!isValidLocale) notFound();

  unstable_setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <FilteredMap />
        <ModalCookies />
      </main>
      <Footer />
    </>
  );
}
