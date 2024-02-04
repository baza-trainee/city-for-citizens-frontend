import Checkbox from '@/assets/icons/common/checkbox.svg';
import clsx from 'clsx';

export default function TypeList({
  eventTypesList,
  eventTypesSelected,
  toggleEventType,
}) {
  return (
    <div className="border-admin-placeholder absolute z-10 mt-1 max-h-[347px] w-full overflow-auto rounded border bg-white px-[9px] py-3.5 ">
      <ul className="flex flex-col gap-[15px] pl-px">
        {eventTypesList.map(type => (
          <button
            onClick={() => toggleEventType(type)}
            type="button"
            key={type}
          >
            <li className="hover:shadow-list flex justify-between leading-snug text-admin-dark">
              <p>{type}</p>

              <div className="flex h-6 min-w-6  items-center justify-center rounded-[5px] border border-admin-dark">
                <Checkbox
                  className={`h-2 w-[14px] translate-y-[1.5px] opacity-0 transition-opacity ${clsx(
                    eventTypesSelected.includes(type) && 'opacity-100'
                  )}`}
                />
              </div>
            </li>
          </button>
        ))}
      </ul>
      {!eventTypesList.length && <p>Тут порожньо ...</p>}
    </div>
  );
}
