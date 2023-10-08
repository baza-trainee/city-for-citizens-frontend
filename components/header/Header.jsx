import Link from "next/link";
import Switchers from "./Switchers";

const Header = () => {
  return (
    <header className="py-[35px] text-sm leading-6 bg-gray/5 text-gray/100 dark:bg-gray/100 dark:text-gray/5">
      <div className="container flex justify-center items-baseline ">
        <Link className="mr-[33px] text-xl leading-normal" href={"/"}>
          Місто для містян
        </Link>
        <div className="flex">
          <Switchers />
        </div>
      </div>
    </header>
  );
};
export default Header;
