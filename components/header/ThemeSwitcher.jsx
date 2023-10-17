'use client';
import { useTheme } from 'next-themes';
import IconCheckbox from '../icons/IconCheckbox';

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
        className={`w-full flex justify-between p-2.5 desctop:h-5 border-t
         border-gray/80 dark:border-gray/10 text-gray/50 dark:text-gray/20 leading-normal ${
           theme === 'dark' ? 'desctop:border-b border-active text-active' : ''
         }`}
        onClick={toggleDarkMode}
      >
        Темна
        <div className="rounded-[4px] border-[1px] border-gray/50 dark:border-gray/20  flex justify-center items-center w-[24px] h-[24px]">
          <IconCheckbox
            className={`stroke-gray/50 dark:stroke-gray/20 transition-all ${
              theme === 'dark' ? 'opacity-100' : 'opacity-0'
            }`}
            width={16}
            height={16}
          />
        </div>
      </button>
      <button
        id="light-mode"
        type="button"
        className={`w-full flex justify-between p-2.5 desctop:h-5 border-t
         border-gray/80 dark:border-gray/10 text-gray/50 dark:text-gray/20 leading-normal ${
           theme === 'dark' ? 'desctop:border-b border-active text-active' : ''
         }`}
        onClick={toggleDarkMode}
      >
        Світла
        <div className="rounded-[4px] border-[1px] border-gray/50 dark:border-gray/20  flex justify-center items-center w-[24px] h-[24px]">
          <IconCheckbox
            className={`stroke-gray/50 dark:stroke-gray/20 transition-all ${
              theme === 'light' ? 'opacity-100' : 'opacity-0'
            }`}
            width={16}
            height={16}
          />
        </div>
      </button>
    </>
  );
};

export default ThemeSwitcher;
