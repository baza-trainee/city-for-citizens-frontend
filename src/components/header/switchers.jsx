import LanguageSwitcher from './language-switcher';
// import ThemeSwitcher from './theme-switcher';

export default function Switchers() {
  return (
    <div className="flex gap-4">
      <LanguageSwitcher />
      {/* <ThemeSwitcher /> */}
    </div>
  );
}
