import { Link } from '@/navigation';
import AdminHeader from '../AdminHeader';

const Partners = () => {
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
};

export default Partners;
