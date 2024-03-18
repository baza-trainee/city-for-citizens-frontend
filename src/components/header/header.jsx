import MenuNavigation from './menu-navigation';
import Switchers from './switchers';
import Logo from '../common/logo';

export function Header() {
  return (
    <header
      className="fixed left-0  top-0 z-[1001]  w-screen bg-light-secondary px-[16px]
    dark:bg-dark-secondary tablet:px-[40px]"
    >
      <div className="container flex h-[80px] max-w-[1440px]  items-center justify-between px-0 ">
        <Logo />
        <MenuNavigation />
        <Switchers />
      </div>
    </header>
  );
}
