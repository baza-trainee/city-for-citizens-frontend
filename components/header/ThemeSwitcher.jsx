'use client';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('ThemeSwitcher');

  const toggleDarkMode = e => {
    if (e.target.id === 'dark-mode') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return (
    <>
      <button
        id="dark-mode"
        type="button"
        className={`h-5 w-max leading-normal  ${
          theme === 'dark' ? 'border-b border-active text-active' : ''
        }`}
        onClick={toggleDarkMode}
      >
        {t('switcherDark')}
      </button>
      <button
        id="light-mode"
        type="button"
        className={`h-5 w-max leading-normal ${
          theme === 'light' ? 'border-b border-active text-active' : ''
        }`}
        onClick={toggleDarkMode}
      >
        {t('switcherLight')}
      </button>
    </>
  );
};

export default ThemeSwitcher;
