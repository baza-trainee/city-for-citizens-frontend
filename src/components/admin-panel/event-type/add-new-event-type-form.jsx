import { BasicModalWindows } from '@/components/common';

export default function AddNewEventTypeForm({ setIsModalVisible }) {
  function handleAddNewTypes() {
    // TODO: add logic add new types
    console.log('fetch: add new types...');
    setIsModalVisible(false);
  }
  return (
    <BasicModalWindows
      onClose={() => setIsModalVisible(false)}
      title={'Додати тип події'}
      type="add-new-type"
    >
      {/* TODO:
            add form
            */}
      <form className=" flex w-full flex-col gap-8">
        <input
          className="w-full border"
          placeholder="Введіть новий тип події українською мовою"
          type="text"
        />
        <input
          className="w-full border"
          placeholder="Введіть новий тип події англійською мовою"
          type="text"
        />
      </form>
      <div className="flex gap-[15px]">
        <button
          className="button-close"
          onClick={() => setIsModalVisible(false)}
          type="button"
        >
          Скасувати
        </button>
        <button
          className="button-confirm"
          onClick={handleAddNewTypes}
          type="button"
        >
          Додати
        </button>
      </div>
    </BasicModalWindows>
  );
}
