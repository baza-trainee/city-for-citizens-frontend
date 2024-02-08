'use client';

import AdminHeader from '@/components/admin-panel/common/admin-header';
import ButtonBack from '@/components/common/button-back';
import EventForm from '@/components/admin-panel/event-list/event-form/event-form';

export default function AddEvent() {
  // TODO: add function onSubmit
  function handleSubmit(formData) {
    console.log('🚀 ~ formData:', formData);
  }

  return (
    <div>
      <AdminHeader title={'Додати подію'}>
        <ButtonBack />
      </AdminHeader>

      <div className="pb-32 pl-5 pr-20">
        <EventForm
          onSubmit={handleSubmit}
          buttonNameSubmit={'Додати подію'}
          buttonNameReset={'Скасувати'}
        />
      </div>
    </div>
  );
}
