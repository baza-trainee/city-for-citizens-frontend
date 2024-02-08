'use client';

import AdminHeader from '@/components/admin-panel/common/admin-header';
import ButtonBack from '@/components/common/button-back';
import EventForm from '@/components/admin-panel/event-list/event-form/event-form';
// import { useGetEventsByIdQuery } from '@/redux/api/eventsApi';

export default function EditEvent(/*{ eventId }*/) {
  // TODO: add function onSubmit
  // const { data: eventDataById } = useGetEventsByIdQuery(eventId);

  function handleSubmit(formData) {
    console.log('🚀 ~ formData:', formData);
  }
  return (
    <div>
      <AdminHeader title={'Редагувати подію'}>
        <ButtonBack />
      </AdminHeader>

      <div className="pb-32 pl-5 pr-20">
        <EventForm
          // initialData={eventDataById}
          onSubmit={handleSubmit}
          buttonNameSubmit={'Додати подію'}
          buttonNameReset={'Скасувати'}
        />
      </div>
    </div>
  );
}
