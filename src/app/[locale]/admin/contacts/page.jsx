'use client';

import Contacts from '@/components/admin-panel/contacts/contacts';
import AdminHeader from '@/components/admin-panel/common/admin-header';
import { useGetContactsQuery } from '@/redux/api/contactsApi';

export default function Page() {
  const { data: fetchedContacts, isLoading, refetch } = useGetContactsQuery();

  const handleContactsUpdate = () => {
    refetch();
  };

  return (
    <div>
      <AdminHeader title={'Контакти'}></AdminHeader>
      {fetchedContacts && (
        <Contacts
          fetchedContacts={fetchedContacts}
          onContactsUpdate={handleContactsUpdate}
        />
      )}
    </div>
  );
}
