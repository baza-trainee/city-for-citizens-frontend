import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pt-[72px] pb-[72px] bg-gray/100 text-gray/5 dark:bg-gray/100 dark:text-gray/5">
      <div className="container flex gap-[49px] ">
        <Link className="mr-[54px]" href={"/"}>
          Місто для містян
        </Link>
        <p>Baza Trainee Ukraine 2023 &copy; Всі права захищені</p>
      </div>
    </footer>
  );
};
export default Footer;
