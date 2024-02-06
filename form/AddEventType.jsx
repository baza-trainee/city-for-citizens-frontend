import { useGetTypesEventsQuery } from '@/redux/api/filtersApi';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import TypeList from './TypeList';
import FormAddNewType from './FormAddNewType';

const AddEventType = ({
  locale,
  errorMessage,
  inputName,
  register,
  inputLabel,
  placeholder,
  setValue,
  clickResetForm,
  watch,
  initialState,
}) => {
  const [eventTypesSelected, setEventTypesSelected] = useState([]);
  const [eventTypesList, setEventTypesList] = useState([]);
  const { data: serverTypeList } = useGetTypesEventsQuery({ locale });

  useEffect(() => {
    setEventTypesSelected([]);
  }, [clickResetForm]);

  useEffect(() => {
    if (initialState) {
      const arr = initialState.split(', ');
      setEventTypesSelected(prev => [...prev, ...arr]);
    }
  }, [initialState, clickResetForm]);

  useEffect(() => {
    if (serverTypeList) {
      setEventTypesList(serverTypeList.map(e => e.trim()));
    }
  }, [serverTypeList]);

  useEffect(() => {
    setValue(inputName, eventTypesSelected.join(', '));
  }, [eventTypesSelected, inputName, setValue]);

  const toggleEventType = type => {
    setEventTypesSelected(prev => {
      const newSet = new Set(prev);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return Array.from(newSet);
    });
  };

  const handleAddNewType = value => {
    if (!eventTypesList.includes(value.trim())) {
      setEventTypesList(prev => [value, ...prev]);
      setEventTypesSelected(prev => [...prev, value]);
    }
  };

  const onDeleteAddedType = type => {
    const onDelete = (prev, type) => {
      const newSet = new Set(prev);
      newSet.delete(type);
      return Array.from(newSet);
    };

    setEventTypesList(prev => onDelete(prev, type));
    setEventTypesSelected(prev => onDelete(prev, type));
  };

  const inputClassNames = `rounded-[5px] border-[2px] p-[10px] outline-none bg-gray/0 dark:border-gray/20 dark:bg-gray/80`;

  return (
    <div className="relative flex h-full w-full flex-col justify-end gap-[6px]">
      <label className="relative flex w-full flex-col">
        <p className="pl-[10px] font-heading text-[22px]">{inputLabel}</p>

        <textarea
          readOnly={true}
          rows={1}
          className={`${inputClassNames} ${clsx(
            'mt-[3px] resize-none',
            errorMessage && watch(inputName) === '' && '!border-[#f94545]'
          )}`}
          autoComplete="off"
          placeholder={placeholder}
          {...register(inputName)}
        />

        {errorMessage && watch(inputName) === '' && (
          <p
            className="absolute top-[calc(100%+2px)] text-[#f94545]"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </label>

      <TypeList
        serverTypeList={serverTypeList && serverTypeList.map(e => e.trim())}
        onDeleteAddedType={onDeleteAddedType}
        eventTypesSelected={eventTypesSelected}
        eventTypesList={eventTypesList}
        toggleEventType={toggleEventType}
      />

      <FormAddNewType handleAddNewType={handleAddNewType} />
    </div>
  );
};

export default AddEventType;
