import ControlSection from '@/components/admin-panel/common/control-section';
import { v4 as uuidv4 } from 'uuid';
import getDate from '@/components/admin-panel/common/getDate';
import { useRouter } from '@/navigation';
export default function DisplayList({ showConfirmationModal, serverData }) {
  const router = useRouter();
  return (
    <div>
      <div
        className="mb-[14px] flex h-[57px] items-center  bg-admin-menu 
           py-3 font-source_sans_3 text-lg text-admin-dark"
      >
        <span className="pl-[43px] tablet:w-[178px] laptop:w-[300px] desktop:w-[550px] desktop_m:w-[648px]">
          Назва
        </span>
        <span className="">Дата додавання</span>
      </div>
      <ul className="mb-[27px] flex flex-col gap-y-[14px]">
        {serverData && serverData.length === 0 && (
          <li>
            <span colSpan={2}>Тут нічого немає</span>
          </li>
        )}
        {serverData &&
          serverData.length > 0 &&
          serverData.map(data => (
            <li
              key={uuidv4()}
              className="flex h-[52px] w-full  items-center
              bg-admin-light_3 font-exo_2 text-admin-dark
            transition duration-200 hover:bg-admin-menu "
            >
              <span className="py-[10px] pl-[43px] pr-[5px] tablet:w-[178px] laptop:w-[300px] desktop:w-[550px] desktop_m:w-[648px]">
                {data.name}
              </span>
              <span className="py-[10px] pr-[5px] font-source_sans_3">
                {getDate(data.createdAt, true)}
              </span>
              <span className="ml-auto tablet:pr-4 laptop:pr-[65px]">
                {console.log('data.id', data.id)}
                <ControlSection
                  deleteOnClick={() =>
                    showConfirmationModal(data.id, data.name)
                  }
                  editOnClick={() => router.push(`/admin/partner/${data.id}`)}
                />
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
