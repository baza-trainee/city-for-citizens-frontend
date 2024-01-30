import { Roboto, Ubuntu, Exo_2, Source_Sans_3 } from 'next/font/google';

export const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['400', '500', '900'],
});

export const ubuntu = Ubuntu({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-ubuntu',
  weight: ['500', '700'],
});

export const exo_2 = Exo_2({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-exo-2',
  weight: ['400', '600', '700'],
});

export const source_sans_3 = Source_Sans_3({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-source-sans-3',
  weight: ['400', '600', '700'],
});
