import AdminHeader from '../AdminHeader';
import ButtonBack from '../button-back';

const AddPartner = () => {
  return (
    <div>
      <AdminHeader title={'Додати партнера'}>
        {' '}
        <ButtonBack />
      </AdminHeader>

      <div className="px-[15px]">AddPartnerForm</div>
    </div>
  );
};

export default AddPartner;
