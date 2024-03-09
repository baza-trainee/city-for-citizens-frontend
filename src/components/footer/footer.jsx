import Logo from '@/components/common/logo';
import Contacts from '@/components/footer/contacts';
import FooterNav from './footer-nav';
import Documents from '@/components/footer/documents';

export function Footer() {
  return (
    <footer className="flex  bg-light-secondary px-[16px] py-[60px] dark:bg-dark-secondary desktop:px-[40px]">
      <div className="container flex w-full max-w-[1440px] flex-col  gap-[48px] p-0 desktop:flex-row  desktop:flex-wrap desktop:gap-[55px]">
        <Logo isFooter={true} />
        <Contacts />
        <FooterNav />
        <Documents />
      </div>
    </footer>
  );
}
