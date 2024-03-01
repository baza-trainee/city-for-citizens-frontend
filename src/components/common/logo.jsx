'use client';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import LogotypeLight from '@/assets/icons/common/logotype.svg';
import LogotypeDark from '@/assets/icons/common/logotype-dark.svg';

export default function Logo({ isFooter = false }) {
  const { theme } = useTheme();

  return (
    <Link
      href="/"
      className={`flex items-center justify-center gap-2 rounded ${isFooter ? 'py-0 desktop:self-start' : 'py-11'} font-roboto text-lg font-black uppercase leading-6 text-black`}
    >
      {theme === 'dark' ? (
        <LogotypeDark alt="Logo MistoFest" width="40" height="40" />
      ) : (
        <LogotypeLight alt="Logo MistoFest" width="40" height="40" />
      )}
      <p className="text-light-accent dark:text-white">
        Misto<span className="dark:text-dark-accent">Fest</span>
      </p>
    </Link>
  );
}
