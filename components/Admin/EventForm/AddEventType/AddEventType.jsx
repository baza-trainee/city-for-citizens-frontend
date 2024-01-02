import CloseButton from '@/components/UI/icons/IconClose';
import IconSelectArrow from '@/components/UI/icons/IconSelectArrow';

import { getFilters } from '@/services/getFilters';

import { useEffect, useRef, useState } from 'react';
import TypeList from './TypeList';
import ErrorMessage from '../ErrorMessage';
import { useTranslations } from 'next-intl';

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
};

const AddEventType = ({
  locale,
  initialState,
  eventTypesSelected,
  setEventTypesSelected,
  attributes,
  errorMessage,
  eventTypePlaceholder,
}) => {
  const [isTypeListVisible, setIsTypeListVisible] = useState(false);
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);

  const [eventTypesList, setEventTypesList] = useState([]);
  const [inputText, setInputText] = useState('');

  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  const t = useTranslations('EventForm.eventType.listTitle');

  useEffect(() => {
    if (initialState) {
      setEventTypesSelected(initialState.split(','));
    }
  }, [initialState, setEventTypesSelected]);

  useEffect(() => {
    const getAllFilters = async () => {
      try {
        const { eventTypes } = await getFilters({
          locale,
        });

        setEventTypesList(eventTypes);
      } catch (error) {
        console.error('Error:', error);
        setEventTypesList([]);
      }
    };

    getAllFilters();
  }, [locale]);

  useEffect(() => {
    if (inputText) {
      if (errorMessage && eventTypesSelected.length === 0) {
        setIsErrorMessageVisible(true);
        return;
      }
    }
    setIsErrorMessageVisible(false);
  }, [inputText, errorMessage, eventTypesSelected]);

  const handleSubmit = () => {
    const trimmedText = inputText.trim();
    if (trimmedText !== '') {
      if (!eventTypesList.includes(trimmedText)) {
        setEventTypesList(prev => [...prev, trimmedText]);
        setEventTypesSelected(prev => [...prev, trimmedText]);
      }
      setInputText('');
    }
  };

  const handleEnterKey = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

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

  useOnClickOutside(wrapperRef, event => {
    if (!buttonRef.current.contains(event.target)) {
      setIsTypeListVisible(false);
    }
  });

  return (
    <div
      ref={wrapperRef}
      className="relative flex w-[300px] flex-col gap-[10px] rounded-[5px]  border-[1px] border-gray/50  bg-gray/0 p-[8px] dark:border-gray/20 dark:bg-gray/80"
    >
      <div className="relative h-[40px] w-full">
        {isErrorMessageVisible &&
        errorMessage &&
        eventTypesSelected.length === 0 ? (
          <ErrorMessage errorMessage={errorMessage} />
        ) : null}
        <textarea
          {...attributes}
          placeholder={eventTypePlaceholder}
          onKeyDown={handleEnterKey}
          className="w-full resize-none rounded-[5px] border-[1px] border-gray/10 bg-gray/5 p-[8px] dark:border-gray/50  dark:bg-gray/80"
          onChange={e => setInputText(e.target.value)}
          readOnly={
            !inputText && eventTypesSelected.length !== 0 && !isTypeListVisible
          }
          value={
            isTypeListVisible || inputText
              ? inputText
              : eventTypesSelected.join(', ')
          }
        />
        {inputText ? (
          <button
            onClick={handleSubmit}
            className="absolute right-[8px] top-[8px] "
          >
            <CloseButton
              width={24}
              height={24}
              className="rotate-[45deg] stroke-[currentColor]"
            />
          </button>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => {
          setIsTypeListVisible(prev => !prev);
        }}
        className="flex justify-between px-[8px]"
        ref={buttonRef}
      >
        <p>
          {eventTypesSelected.length === 0 ? t('listEmpty') : t('noListEmpty')}
        </p>
        <IconSelectArrow
          width={24}
          height={24}
          className={`h-[24px] w-[24px] cursor-pointer transition-all ${
            isTypeListVisible ? '-rotate-180' : ''
          }`}
        />
      </button>

      {isTypeListVisible ? (
        <TypeList
          eventTypesList={eventTypesList}
          toggleEventType={toggleEventType}
          eventTypesSelected={eventTypesSelected}
        />
      ) : null}
    </div>
  );
};

export default AddEventType;
