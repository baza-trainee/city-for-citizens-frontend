import AdminHeader from '../AdminHeader';

const EventTypeList = () => {
  return (
    <div>
      <AdminHeader title={'Типи подій'}>
        <button>Додати новий тип</button>
      </AdminHeader>
      <div className="px-[15px]">EventTypeListComponent</div>
    </div>
  );
};

export default EventTypeList;
