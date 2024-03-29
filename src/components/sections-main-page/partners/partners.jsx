import PartnersTape from './partners-tape';
import PartnersTitle from './partners-title';

export function Partners() {
  return (
    <section
      id="partners"
      className="mx-auto flex max-w-[1920px] flex-col items-center justify-center overflow-hidden bg-light-secondary pb-[120px] pt-[80px] dark:bg-dark-secondary"
    >
      <PartnersTitle />
      <PartnersTape />
    </section>
  );
}
