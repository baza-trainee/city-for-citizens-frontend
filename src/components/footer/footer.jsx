import Logo from '@/components/common/logo';
import Contacts from '@/components/footer/contacts';
import FooterNav from './footer-nav';
import Documents from '@/components/footer/documents';
import Developed from '@/components/footer/developed';

export function Footer() {
  return (
    <footer className=" bg-light-secondary  px-0 py-[60px] dark:bg-dark-secondary tablet:px-[40px]">
      <div className="container flex w-full max-w-[1440px] flex-col tablet:p-0 ">
        <div
          className="mb-3 flex flex-col items-center justify-between gap-12 tablet:mb-12 tablet:flex-row 
        tablet:items-start tablet:gap-0"
        >
          <div className="inline-flex flex-col justify-center gap-12 tablet:items-start laptop:flex-row">
            <Logo isFooter={true} />
            <Contacts />
          </div>
          <FooterNav />
          <Documents />
        </div>
        <Developed />
      </div>
    </footer>
  );
}
