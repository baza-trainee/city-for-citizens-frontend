import AdminHeader from '@/components/admin-panel/common/admin-header';
import ButtonBack from '@/components/common/button-back';
import PartnerForm from '@/components/admin-panel/partners/partner-form';

export default function AddPartner() {
  return (
    <div>
      <AdminHeader title={'Додати партнера'}>
        <ButtonBack />
      </AdminHeader>

      <div className="px-[15px]">
        <PartnerForm />
      </div>
    </div>
  );
}
