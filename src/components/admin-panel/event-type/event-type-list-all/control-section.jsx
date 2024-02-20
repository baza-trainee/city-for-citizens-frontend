import IconTrash from '@/assets/icons/common/trash-icon.svg';
import IconPencil from '@/assets/icons/common/pencil-icon.svg';

export default function ControlSection({ deleteOnClick, editOnClick }) {
  return (
    <div className="flex items-center gap-x-10 pl-[2.4rem] ">
      <button
        onClick={editOnClick}
        type="button"
        title="Редагувати подію"
        className="text-admin-dark hover:text-admin-green"
      >
        <IconPencil
          width="22"
          height="20"
          className="w-[22px] transition duration-200"
        />
      </button>
      <button onClick={deleteOnClick} title="Видалити подію" type="button">
        <IconTrash
          width="17"
          height="24"
          className="inline fill-admin-dark transition duration-200 hover:fill-[red]"
        />
      </button>
    </div>
  );
}
