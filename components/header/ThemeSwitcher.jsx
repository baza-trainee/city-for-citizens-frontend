'use client';
import { useTheme } from 'next-themes';

const ThemeSwitcher = ({ buttonStyle, icon }) => {
  const { theme, setTheme } = useTheme();
  const themes = [
    { name: 'Темна', value: 'dark', id: 'dark-mode' },
    { name: 'Світла', value: 'light', id: 'light-mode' },
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
          <div className="rounded-[4px] border-[1px] border-gray/50 dark:border-gray/20 flex justify-center items-center w-[24px] h-[24px] desktop:hidden">
            {theme === themeItem.value ? icon : null}
          </div>
        </button>
      ))}
    </>
  );
};

export default ThemeSwitcher;
