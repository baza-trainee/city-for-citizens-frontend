'use client';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

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
        className={`w-full p-2.5 tablet:h-5 border-t border-gray/80 leading-normal max-tablet:text-left tablet:w-max ${
          theme === 'dark' ? 'border-b border-active tablet:text-active' : ''
        }`}
        onClick={toggleDarkMode}
      >
        Темна
      </button>
      <button
        id="light-mode"
        type="button"
        className={`w-full p-2.5 tablet:h-5 leading-normal border-t border-gray/80 max-tablet:text-left tablet:w-max ${
          theme === 'light'
            ? 'tablet:border-b border-active tablet:text-active'
            : ''
        }`}
        onClick={toggleDarkMode}
      >
        Світла
      </button>
    </>
  );
};

export default ThemeSwitcher;
