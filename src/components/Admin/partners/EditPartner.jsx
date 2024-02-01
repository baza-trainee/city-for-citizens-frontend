import AdminHeader from '../AdminHeader';
import ButtonBack from '../button-back';

const EditPartner = ({ partnerId }) => {
  return (
    <div>
      <AdminHeader title={'Редагувати партнера'}>
        <ButtonBack />
      </AdminHeader>

      <div className="px-[15px]">EditPartnerForm - {partnerId}</div>
    </div>
  );
};

export default EditPartner;
