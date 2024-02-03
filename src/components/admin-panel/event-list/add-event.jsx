import AdminHeader from '@/components/admin-panel/common/admin-header';
import ButtonBack from '@/components/common/button-back';
import EventForm from '@/components/admin-panel/event-list/event-form';

export default function AddEvent() {
  return (
    <div>
      <AdminHeader title={'Додати подію'}>
        <ButtonBack />
      </AdminHeader>

      <div className="px-[15px]">
        <EventForm />
      </div>
    </div>
  );
}
