import ControlSection from '@/components/admin-panel/common/control-section';

export default function DisplayList({
  showConfirmationModal,
  edit,
  typesData,
}) {
  return (
    <div>
      <div
        className="mb-[17px] h-[54px]
           bg-admin-menu py-3 font-source_sans_3 text-lg text-admin-dark"
      >
        <span className="pl-[43px]">Тип події</span>
      </div>
      <ul className="mb-[27px] flex flex-col gap-y-[14px]">
        {typesData && typesData.length === 0 && (
          <li>
            <span colSpan={2}>Тут нічого немає</span>
          </li>
        )}
        {typesData &&
          typesData.length > 0 &&
          typesData.map(type => (
            <li
              key={type.id}
              className="flex h-14 w-full  items-center justify-between
            bg-admin-light_3 font-exo_2 text-admin-dark transition duration-200 hover:bg-admin-menu"
            >
              <span className="py-3 pl-[43px] pr-[5px]">{type.eventType}</span>
              <span className="tablet:pr-4 laptop:pr-[93px]">
                <ControlSection
                  deleteOnClick={() =>
                    showConfirmationModal(type.idIdentifier, type.eventType)
                  }
                  editOnClick={() => edit(type.idIdentifier)}
                />
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
