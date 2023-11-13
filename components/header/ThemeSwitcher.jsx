'use client';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

const ThemeSwitcher = ({ buttonStyle, icon }) => {
  const t = useTranslations('ThemeSwitcher');
  const { theme, setTheme } = useTheme();
  const themes = [
    { name: t('switcherDark'), value: 'dark', id: 'dark-mode' },
    { name: t('switcherLight'), value: 'light', id: 'light-mode' },
  ];

  const toggleDarkMode = e => {
    const selectedTheme = themes.find(item => item.id === e.currentTarget.id);
    if (selectedTheme) {
      setTheme(selectedTheme.value);
    }
  };

  return (
    <>
      {themes.map(themeItem => (
        <button
          type="button"
          key={themeItem.id}
          id={themeItem.id}
          className={`${buttonStyle} ${
            theme === themeItem.value
              ? 'desktop:border-b desktop:border-active desktop:text-active'
              : ''
          }`}
          onClick={toggleDarkMode}
        >
          {themeItem.name}
          <div className="flex h-[24px] w-[24px] items-center justify-center rounded-[4px] border-[1px] border-gray/50 dark:border-gray/20 desktop:hidden">
            {theme === themeItem.value ? icon : null}
          </div>
        </button>
      ))}
    </>
  );
};

export default ThemeSwitcher;
