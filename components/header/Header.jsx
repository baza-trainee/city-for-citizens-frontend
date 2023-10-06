import Link from "next/link";
import Switchers from "./Switchers";

const Header = () => {
  return (
    <header className="py-[35px] text-sm leading-6">
      <div className="container flex justify-center items-baseline ">
        <Link className="mr-[33px] text-xl" href={"/"}>
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
