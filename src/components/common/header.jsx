import MenuNavigation from '../header/menu-navigation';
import Switchers from '../header/switchers';
import Logo from './logo';

export function Header() {
  return (
    <header className="fixed left-0 right-0  w-full  bg-light-secondary dark:bg-dark-secondary">
      <div className="container flex h-[80px] max-w-full items-center justify-between">
        <Logo />
        <MenuNavigation />
        <Switchers />
      </div>
    </header>
  );
}
