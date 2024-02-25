import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import DropdownIcon from '@/assets/icons/common/dropdown-icon.svg';
import TypeList from './type-list';
import { FormElement } from '../form-element';
import { useGetTypesEventByLocaleQuery } from '@/redux/api/typesEventApi';

export default function InputEventType({
  locale,
  errorMessage,
  placeholder,
  register,
  inputName,
  setValue,
  clickResetForm,
  clearErrors,
  initialState,
  resetField,
}) {
  const [isTypeListVisible, setIsTypeListVisible] = useState(false);
  const [eventTypesSelected, setEventTypesSelected] = useState([]);

  const [eventTypesSelectedText, setEventTypesSelectedText] = useState('');
  const typeListRef = useRef(null);

  const { data: eventTypesList } = useGetTypesEventByLocaleQuery({ locale });

  useEffect(() => {
    setEventTypesSelected([]);
    setEventTypesSelectedText('');
  }, [clickResetForm]);

  useEffect(() => {
    if (initialState && eventTypesList) {
      const currentTypes = initialState
        .split(', ')
        .map(type =>
          eventTypesList.find(({ eventType }) => eventType === type.trim())
        );

      setEventTypesSelected(currentTypes);
    }
  }, [eventTypesList, initialState]);

  useEffect(() => {
    if (eventTypesSelected.length) clearErrors([inputName]);

    if (eventTypesSelected.length !== 0) {
      setValue(inputName, eventTypesSelected.map(({ id }) => id).join(','));
      setEventTypesSelectedText(
        eventTypesSelected.map(({ eventType }) => eventType).join(', ')
      );
    } else {
      resetField(inputName);
      setEventTypesSelectedText('');
    }
  }, [clearErrors, eventTypesSelected, inputName, resetField, setValue]);

  function toggleEventType(type) {
    setEventTypesSelected(prev => {
      const newSet = new Set(prev);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return Array.from(newSet);
    });
  }

  useOnClickOutside(isTypeListVisible, typeListRef, () =>
    setIsTypeListVisible(false)
  );

  return (
    <div className="relative w-full ">
      <button
        className="flex w-full "
        type="button"
        onClick={() => {
          setIsTypeListVisible(true);
        }}
      >
        <FormElement
          altTextValue
          errorMessage={errorMessage}
          type={'text'}
          tag={'textarea'}
          rows={1}
          readOnly={true}
          placeholder={placeholder}
          register={register}
          className={'pr-10'}
        />
        {
          <p className="absolute top-1/2 -translate-y-1/2 px-[9px]">
            {eventTypesSelectedText}
          </p>
        }
        <DropdownIcon
          className={`absolute right-[15px] top-1/2 h-2 w-[14px] -translate-y-1/2 transition-transform
          ${clsx(isTypeListVisible && 'rotate-180')}`}
        />
      </button>

      {isTypeListVisible && (
        <div ref={typeListRef}>
          <TypeList
            eventTypesList={eventTypesList}
            toggleEventType={toggleEventType}
            eventTypesSelected={eventTypesSelected}
          />
        </div>
      )}
    </div>
  );
}
