const coordinates =
  '^(\\+|-)?((\\d((\\.)|\\.\\d{1,20})?)|(0*?[0-8]\\d((\\.)|\\.\\d{1,20})?)|(0*?4?[1-9]|0)((\\.)|\\.0{1,20})?),\\s*(\\+|-)?((\\d((\\.)|\\.\\d{1,20})?)|(0*?\\d\\d((\\.)|\\.\\d{1,20})?)|(0*?1[0-7]\\d((\\.)|\\.\\d{1,20})?)|(0*?1[0-7][0-9]|[1-8]\\d|90)((\\.)|\\.0{1,20})?)$';

const eventType = (
  <span>
    Натисніть на кнопку &quot;Додати
    <span className="relative top-[4px] text-[28px] leading-[0]"> ⊕</span>
    &quot;.
  </span>
);

const eventImage = <span>Додайте картинку події.</span>;

export const regexPatterns = { coordinates };

export const errorMessage = { eventType, eventImage };
