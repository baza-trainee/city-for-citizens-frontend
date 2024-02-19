import { useTheme } from 'next-themes';
import IconSun from '@/assets/icons/theme-switchers/icon-sun.svg';
import IconMoon from '@/assets/icons/theme-switchers/icon-moon.svg';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-gray/80 dark:bg-gray/5 flex h-4 w-8 items-center justify-between rounded-full p-[1px]">
      <button
        className="bg-gray/5 flex h-[13px] w-[13px] items-center justify-center rounded-full"
        type="button"
        onClick={() => setTheme('light')}
      >
        {theme === 'light' ? <IconSun width={8} height={8} /> : ''}
      </button>
      <button
        className="bg-gray/80 flex h-[13px] w-[13px] items-center justify-center rounded-full"
        type="button"
        onClick={() => setTheme('dark')}
      >
        {theme === 'dark' ? <IconMoon width={8} height={8} /> : ''}
      </button>
    </div>
  );
}
