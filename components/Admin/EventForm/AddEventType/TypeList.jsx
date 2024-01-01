import IconCheckbox from '@/components/UI/icons/IconCheckbox';

const TypeList = ({ eventTypesList, toggleEventType, eventTypesSelected }) => {
  return (
    <div className="absolute left-0 top-[calc(100%+5px)] z-10 w-full rounded-[5px] border-[1px] border-gray/10 bg-gray/0 p-[6px] px-[16px] py-[8px] dark:border-gray/30  dark:bg-gray/80">
      <ul className="flex flex-col gap-[5px] ">
        {eventTypesList.map(type => {
          return (
            <li key={type}>
              <button
                type="button"
                onClick={() => toggleEventType(type)}
                className="flex w-full justify-between"
              >
                <p>{type}</p>
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-[4px] border-[1px] border-gray/50 dark:border-gray/10">
                  <IconCheckbox
                    className={`stroke-gray/50 transition-all dark:stroke-gray/10 ${
                      eventTypesSelected.includes(type)
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                    width={16}
                    height={16}
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      {eventTypesList.length === 0 ? <p>Тут порожньо ...</p> : null}
    </div>
  );
};

export default TypeList;
