'use client';

import Documents from '@/components/admin-panel/documents/documents';
import AdminHeader from '@/components/admin-panel/common/admin-header';
import { useGetDocumentsQuery } from '@/redux/api/documentsApi';

export default function Page() {
  const { data: fetchedDocuments, refetch } = useGetDocumentsQuery();

  const handleDocumentsUpdate = () => {
    refetch();
  };

  return (
    <div>
      <AdminHeader title={'Документи'}></AdminHeader>
      {fetchedDocuments && (
        <Documents
          fetchedDocuments={fetchedDocuments}
          onDocumentsUpdate={handleDocumentsUpdate}
        />
      )}
    </div>
  );
}
