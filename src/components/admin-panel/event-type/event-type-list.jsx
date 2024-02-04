import AdminHeader from '@/components/admin-panel/common/admin-header';

export default function EventTypeList() {
  return (
    <div>
      <AdminHeader title={'Типи подій'}>
        <button className="button-common bg-admin-dark px-[30px] py-[10px] text-white">
          Додати новий тип
        </button>
      </AdminHeader>
      <div className="px-[15px]">EventTypeListComponent</div>
    </div>
  );
}
