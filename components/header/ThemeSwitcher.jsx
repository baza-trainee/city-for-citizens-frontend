"use client";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = (e) => {
    if (e.target.id === "dark-mode") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <>
      <button
        id="dark-mode"
        type="button"
        className={`w-max h-5 leading-normal ${
          theme === "dark" ? "border-b border-active text-active" : ""
        }`}
        onClick={toggleDarkMode}
      >
        Темна
      </button>
      <button
        id="light-mode"
        type="button"
        className={`h-5 w-max leading-normal ${
          theme === "light" ? "border-b border-active text-active" : ""
        }`}
        onClick={toggleDarkMode}
      >
        Світла
      </button>
    </>
  );
};

export default ThemeSwitcher;
