import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  return (
    <header className="py-[35px] bg-gray/5 dark:bg-gray/100 dark:text-gray/5 text-gray-100 text-sm leading-6">
      <div className="container flex justify-center items-baseline ">
        <Link className="mr-[33px] text-xl" href={"/"}>
          Місто для містян
        </Link>
        <div className="flex">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};
export default Header;
