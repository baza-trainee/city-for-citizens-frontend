import IconCheckbox from '@/components/UI/icons/IconCheckbox';
import CloseButton from '@/components/UI/icons/IconClose';
import IconSelectArrow from '@/components/UI/icons/IconSelectArrow';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

const TypeList = ({
  serverTypeList,
  eventTypesList,
  toggleEventType,
  eventTypesSelected,
  onDeleteAddedType,
}) => {
  const [isTypeListVisible, setIsTypeListVisible] = useState(false);
  const typeListRef = useRef(null);
  const t = useTranslations('EventForm.eventType.listTitle');
  useOnClickOutside(isTypeListVisible, typeListRef, () =>
    setIsTypeListVisible(false)
  );
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsTypeListVisible(true);
        }}
        className="flex w-full justify-between px-[8px] pt-[16px]"
      >
        <p>
          {eventTypesSelected.length === 0 ? t('listEmpty') : t('noListEmpty')}
        </p>
        <IconSelectArrow
          width={24}
          height={24}
          className={`h-[24px] w-[24px] cursor-pointer transition-all ${clsx(
            isTypeListVisible && '-rotate-180'
          )}`}
        />
      </button>
      {isTypeListVisible && (
        <div
          ref={typeListRef}
          className="absolute left-0 top-[calc(100%+5px)] z-10 w-full rounded-[5px] border-[1px] border-gray/50 bg-gray/0 p-[6px] px-[16px] py-[8px] dark:border-gray/20  dark:bg-gray/80"
        >
          <ul className="flex flex-col gap-[5px] ">
            {eventTypesList.map(type => {
              return (
                <li className="flex w-full justify-between" key={type}>
                  <p>{type}</p>
                  {!serverTypeList.includes(type) && (
                    <button
                      onClick={() => {
                        onDeleteAddedType(type);
                      }}
                      type="button"
                      className="ml-auto mr-[20px]"
                    >
                      <CloseButton className="w-[24px] stroke-[currentColor]" />
                    </button>
                  )}
                  <button
                    className="flex h-[24px] w-[24px] items-center justify-center rounded-[4px] border-[1px] border-gray/50 dark:border-gray/10"
                    onClick={() => toggleEventType(type)}
                    type="button"
                  >
                    <IconCheckbox
                      className={`stroke-gray/50 opacity-0 transition-all dark:stroke-gray/10 ${clsx(
                        eventTypesSelected.includes(type) && 'opacity-100'
                      )}`}
                      width={16}
                      height={16}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          {eventTypesList.length === 0 ? <p>Тут порожньо ...</p> : null}
        </div>
      )}
    </>
  );
};

export default TypeList;
