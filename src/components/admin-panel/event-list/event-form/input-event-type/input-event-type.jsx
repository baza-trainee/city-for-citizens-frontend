import { useGetTypesEventsQuery } from '@/redux/api/filtersApi';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import DropdownIcon from '@/assets/icons/common/dropdown-icon.svg';
import TypeList from './type-list';
import { FormElement } from '../form-element';

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
}) {
  const [isTypeListVisible, setIsTypeListVisible] = useState(false);
  const [eventTypesSelected, setEventTypesSelected] = useState([]);
  const typeListRef = useRef(null);

  const { data: eventTypesList } = useGetTypesEventsQuery({ locale });

  useEffect(() => {
    setEventTypesSelected([]);
  }, [clickResetForm]);

  useEffect(() => {
    if (initialState) {
      setEventTypesSelected(initialState.split(',').map(t => t.trim()));
    }
  }, [initialState]);

  useEffect(() => {
    if (eventTypesSelected.length) clearErrors([inputName]);

    setValue(inputName, eventTypesSelected.join(', '));
  }, [clearErrors, eventTypesSelected, inputName, setValue]);

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
          errorMessage={errorMessage}
          type={'text'}
          tag={'textarea'}
          rows={1}
          readOnly={true}
          placeholder={placeholder}
          register={register}
        />
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
