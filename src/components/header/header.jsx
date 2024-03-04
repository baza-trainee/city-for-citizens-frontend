import MenuNavigation from './menu-navigation';
import Switchers from './switchers';
import Logo from '../common/logo';

export function Header() {
  return (
    <header className="fixed left-0  top-0 z-[999]  w-screen bg-light-secondary dark:bg-dark-secondary desktop:px-[40px]">
      <div className="container flex h-[80px]  max-w-[1440px] items-center justify-between desktop:px-[0px]">
        <Logo />
        <MenuNavigation />
        <Switchers />
      </div>
    </header>
  );
}
