import IconCheckbox from '@/components/UI/icons/IconCheckbox';
import CloseButton from '@/components/UI/icons/IconClose';
import IconSelectArrow from '@/components/UI/icons/IconSelectArrow';
import { getFilters } from '@/services/getFilters';

import { useEffect, useRef, useState } from 'react';

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
}) => {
  const [isTypeListVisible, setIsTypeListVisible] = useState(false);

  const [eventTypesList, setEventTypesList] = useState([]);
  const [inputText, setInputText] = useState('');

  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  const errorMessageRef = useRef(null);

  useEffect(() => {
    if (errorMessage && eventTypesSelected.length === 0) {
      errorMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      errorMessageRef.current.focus();
    }
  }, [errorMessage, eventTypesSelected]);

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
      className="relative flex w-[300px] flex-col gap-[10px] rounded-[5px] bg-gray/10 p-[8px] dark:bg-gray/80"
    >
      <div className="relative h-[40px] w-full">
        {errorMessage && eventTypesSelected.length === 0 ? (
          <p ref={errorMessageRef}>{errorMessage} </p>
        ) : null}
        <textarea
          {...attributes}
          onKeyDown={handleEnterKey}
          className="w-full resize-none rounded-[5px] bg-gray/20 p-[8px] dark:bg-gray/100"
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
        <p>Або виберіть із списку</p>
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

const TypeList = ({ eventTypesList, toggleEventType, eventTypesSelected }) => {
  return (
    <div className="absolute left-0 top-[calc(100%+5px)] z-10 w-full rounded-[5px] bg-gray/10 p-[6px] px-[16px] py-[8px] dark:bg-gray/80">
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
