import Link from "next/link";

const Header = () => {
  return (
    <header className="pt-[35px] pb-[35px]">
      <div className="container flex justify-center ">
        <Link className="mr-[54px]" href={"/"}>
          Місто для містян
        </Link>
        <div className="flex gap-[24px]">
          <label>
            Тема
            <select name="theme">
              <option value="light">Світла</option>
              <option value="dark">Темна</option>
            </select>
          </label>
          <label>
            Мова
            <select name="lang">
              <option value="uk">Укр</option>
              <option value="en">Англ</option>
            </select>
          </label>
        </div>
      </div>
    </header>
  );
};
export default Header;
