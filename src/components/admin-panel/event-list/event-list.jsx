import { Link } from '@/navigation';
import AdminHeader from '@/components/admin-panel/common/admin-header';

export default function EventList() {
  return (
    <div>
      <AdminHeader title={'Всі події'}>
        <Link
          className="button-common bg-admin-dark px-[30px] py-[10px] text-white"
          href={'/admin/event'}
        >
          Додати подію
        </Link>
      </AdminHeader>

      <div className="px-[15px]">EventListComponent</div>
    </div>
  );
}
