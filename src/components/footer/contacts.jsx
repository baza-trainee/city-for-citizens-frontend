import PhoneIcon from '@/assets/icons/common/phone-icon.svg';
import MailIcon from '@/assets/icons/common/mail-icon.svg';
import { BASE_URL } from '@/helpers/constants';

async function getContacts() {
  const res = await fetch(`${BASE_URL}/contacts`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Contacts() {
  const [contactsData] = await getContacts();

  if (!contactsData) {
    return null;
  }
  const { firstPhone, secondPhone, email } = contactsData;

  function formatPhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber.replace(/\D/g, '');

    phoneNumber = phoneNumber.replace(
      /(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/,
      '+$1 $2 $3-$4-$5'
    );

    return phoneNumber;
  }

  return (
    <ul className="flex flex-col gap-[3px] font-roboto text-base font-normal leading-snug text-light-main dark:text-dark-main max-desktop:mx-auto desktop:mr-[247px]">
      {firstPhone && (
        <li
          key="firstPhone"
          className="cursor-pointer hover:text-light-accent hover:transition-all dark:hover:text-dark-accent"
        >
          <a href={`tel:${firstPhone}`} className="inline-flex gap-2">
            <span className="inline-flex items-baseline">
              <PhoneIcon />
            </span>
            {formatPhoneNumber(firstPhone)}
          </a>
        </li>
      )}
      {secondPhone && (
        <li
          key="secondPhone"
          className="cursor-pointer hover:text-light-accent hover:transition-all dark:hover:text-dark-accent"
        >
          <a href={`tel:${secondPhone}`} className="inline-flex gap-2">
            <span className="inline-flex items-baseline">
              <PhoneIcon />
            </span>
            {formatPhoneNumber(secondPhone)}
          </a>
        </li>
      )}
      {email && (
        <li
          key="email"
          className="cursor-pointer  hover:text-light-accent hover:transition-all dark:hover:text-dark-accent"
        >
          <a href={`mailto:${email}`} className=" inline-flex gap-2">
            <span className="inline-flex items-baseline">
              <MailIcon />
            </span>
            {email}
          </a>
        </li>
      )}
    </ul>
  );
}
