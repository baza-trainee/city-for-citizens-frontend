import { Link } from '@/navigation';
import AdminHeader from '@/components/admin-panel/common/admin-header';

export default function Partners() {
  return (
    <div>
      <AdminHeader title={'Партнери'}>
        <Link
          className="button-common bg-admin-dark px-[30px] py-[10px] text-white"
          href={'/admin/partner'}
        >
          Додати партнера
        </Link>
      </AdminHeader>

      <div className="px-[15px]">PartnersComponent</div>
    </div>
  );
}
