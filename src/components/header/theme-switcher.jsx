'use client';
import { useTheme } from 'next-themes';
import IconSun from '@/assets/icons/theme-switchers/icon-sun.svg';
import IconMoon from '@/assets/icons/theme-switchers/icon-moon.svg';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="mx-2 flex h-4 w-8 items-center justify-between rounded-full bg-light-button-switch p-[1px] dark:bg-dark-button-switch"
    >
      <div
        className="flex h-[13px] w-[13px] items-center justify-center rounded-full bg-dark-button-switch"
        type="button"
      >
        {theme === 'light' ? <IconSun width={8} height={8} /> : ''}
      </div>
      <div className="flex h-[13px] w-[13px] items-center justify-center rounded-full bg-light-button-switch">
        {theme === 'dark' ? <IconMoon width={8} height={8} /> : ''}
      </div>
    </button>
  );
}
