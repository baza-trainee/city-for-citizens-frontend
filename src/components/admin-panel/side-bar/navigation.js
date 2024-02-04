import allEventsIcon from '@/assets/icons/admin-sidebar/all-events-icon.svg';
import contactsIcon from '@/assets/icons/admin-sidebar/contacts-icon.svg';
import documentsIcon from '@/assets/icons/admin-sidebar/documents-icon.svg';
import partnersIcon from '@/assets/icons/admin-sidebar/partners-icon.svg';
import passwordChangeIcon from '@/assets/icons/admin-sidebar/password-change-icon.svg';
import typeEventsIcon from '@/assets/icons/admin-sidebar/type-events-icon.svg';
import { ADMIN_NAVIGATION } from '@/helpers/constants';

export const adminNavigation = [
  { href: ADMIN_NAVIGATION.event_list, name: 'Всі події', icon: allEventsIcon },
  {
    href: ADMIN_NAVIGATION.event_types,
    name: 'Типи подій',
    icon: typeEventsIcon,
  },
  { href: ADMIN_NAVIGATION.partners, name: 'Партнери', icon: partnersIcon },
  { href: ADMIN_NAVIGATION.documents, name: 'Документи', icon: documentsIcon },
  { href: ADMIN_NAVIGATION.contacts, name: 'Контакти', icon: contactsIcon },
  {
    href: ADMIN_NAVIGATION.password_change,
    name: 'Змінити пароль',
    icon: passwordChangeIcon,
  },
];
