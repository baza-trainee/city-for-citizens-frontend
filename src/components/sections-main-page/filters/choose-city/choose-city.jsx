'use client';

import IconSelectArrow from '@/assets/icons/filters/drop-down-icon.svg';
import IconInputCity from '@/assets/icons/filters/location_input-icon.svg';
import IconCheckbox from '@/assets/icons/filters/checkbox-icon.svg';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setFilters } from '@/redux/slice/filters';

export default function ChooseCity({ filtersEventCities }) {
  const [inputValue, setInputValue] = useState('');
  const [isListVisible, setIsListVisible] = useState(false);
  const [displayedCities, setDisplayedCities] = useState(filtersEventCities);
  const [selectedCities, setSelectedCities] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [inputReadOnly, setInputReadOnly] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [hasFocusInput, setHasFocusInput] = useState(false);
  const [hasFocusList, setHasFocusList] = useState(false);
  const [hasFocusArrow, setHasFocusArrow] = useState(false);
  const dispatch = useDispatch();
  const t = useTranslations('Filters.ChooseCity');
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  useEffect(() => {
    filtersEventCities.length !== 0 && setIsLoadingData(false);
  }, [filtersEventCities]);

  useEffect(() => {
    selectedCities && setInputValue(selectedCities.join(', '));
    selectedCities && dispatch(setFilters({ city: selectedCities.join(',') }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCities]);

  useEffect(() => {
    !isListVisible && !selectedCities && setInputValue('');
    !isListVisible &&
      selectedCities &&
      setInputValue(selectedCities.join(', '));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListVisible]);

  useEffect(() => {
    !isLoadingData &&
      inputValue &&
      displayedCities.length === 0 &&
      setValidationMessage('textIsEmpty');
    !inputValue && setDisplayedCities(filtersEventCities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedCities, inputValue, isLoadingData]);

  function handleInputChange(event) {
    const value = event.target.value.replace(/^\s/, '');
    setInputValue(value);

    if (value) {
      setValidationMessage('');
      if (isInputValueValid(value)) {
        const filteredCities = filteredCityByInputValue(value);
        setDisplayedCities(filteredCities);
      } else {
        setValidationMessage(
          isNeedSwitchKeyboardLayout(value) ? 'switchLayout' : 'noValid'
        );
      }
      if (isInputValueIncludesCityFrom(filtersEventCities, value)) {
        setInputReadOnly(true);
      }
    } else {
      setValidationMessage('');
      setDisplayedCities(filtersEventCities);
    }
    setIsListVisible(true);
  }

  function isInputValueValid(value, currLocale = locale) {
    switch (currLocale) {
      case 'uk':
        return [...value].every(char => ukrainanLayout(char));
      case 'en':
        return [...value].every(char => englishLayout(char));
    }
  }

  function isNeedSwitchKeyboardLayout(value, currLocale = locale) {
    switch (currLocale) {
      case 'uk':
        return [...value].some(char => englishLayout(char));
      case 'en':
        return [...value].some(char => ukrainanLayout(char));
    }
  }

  function englishLayout(char) {
    return char.match(/^[a-z\s-]+$/i);
  }

  function ukrainanLayout(char) {
    return char.match(/^((?![эъ])[а-яіїє'\-\s])+$/i);
  }

  function toggleCheck(city) {
    if (selectedCities.includes(city)) {
      setSelectedCities(prev => prev.filter(el => el !== city));
    } else {
      setSelectedCities(prev => [...prev, city]);
    }
  }

  function handleOnclick() {
    setInputReadOnly(false);
    setInputValue('');
    setDisplayedCities(filtersEventCities);
    setIsListVisible(true);
  }

  function filteredCityByInputValue(value = inputValue) {
    const valueToLowerCase = value.toLowerCase();
    return filtersEventCities.filter(city =>
      city.toLowerCase().startsWith(valueToLowerCase)
    );
  }

  function isInputValueIncludesCityFrom(cityArr, input = inputValue) {
    return input
      .split(', ')
      .every(
        value =>
          cityArr.includes(
            value.replace(/^[\wа-я]/, char => char.toUpperCase())
          ) ||
          cityArr.includes(
            value.replace(/^[\wа-я]/, char => char.toLowerCase())
          )
      );
  }

  function handleListFocus() {
    setHasFocusList(true);
    setHasFocusInput(false);
    setIsListVisible(true);
  }

  function handleInputLostFocus() {
    setHasFocusInput(false);
    if (!hasFocusList && !hasFocusArrow) {
      setIsListVisible(false);
    }
  }

  function handleListLostFocus() {
    setHasFocusList(false);
    if (!hasFocusInput && !hasFocusArrow) {
      setIsListVisible(false);
    }
  }

  function handleInputFocus() {
    setHasFocusInput(true);
    setIsListVisible(true);
    setHasFocusList(false);
  }

  function handleControlList() {
    setHasFocusArrow(true);
    if (!isListVisible) {
      setIsListVisible(true);
    }
    if (isListVisible) {
      resetState();
    }
  }

  function resetState() {
    setHasFocusInput(false);
    setHasFocusList(false);
    setHasFocusList(false);
    setIsListVisible(false);
  }

  function handleArrowLostFocus() {
    setHasFocusArrow(false);
    if (!hasFocusList && !hasFocusInput) {
      setIsListVisible(false);
    }
  }

  const setColor = () => {
    if (isListVisible) {
      return `text-light-input-focus dark:text-dark-input-focus`;
    }
    return `text-light-input-focus dark:text-dark-input-focus`;
  };

  const commonStyles = {
    text: ` text-base  truncate whitespace-nowrap leading-[1.5] -tracking-[0.176px] ${setColor()}
    `,
    icon: `w-[24px] h-[24px] cursor-pointer transition-all} `,
  };

  return (
    <div className="relative flex w-full flex-col ">
      <span className="mb-1 block font-roboto text-sm text-light-main dark:text-dark-main">
        {t('label')}
      </span>

      <div
        className="flex h-[48px] items-center justify-between rounded-lg bg-light-secondary
        p-[12px_12px_12px_16px] leading-[22.4px]
        shadow-[0_5px_12px_rgba(115,115,115,0.1)]  transition-all 
          dark:border dark:border-dark-border
         dark:bg-dark-secondary dark:text-dark-input-default
          dark:shadow-none "
      >
        <div className="flex grow gap-x-2 ">
          <IconInputCity width={24} height={24} />
          <input
            type="text"
            name="city"
            onFocus={handleInputFocus}
            onBlur={handleInputLostFocus}
            placeholder={t('defaultValue')}
            value={inputValue}
            onChange={handleInputChange}
            onClick={handleOnclick}
            readOnly={inputReadOnly}
            autoComplete="off"
            className={`${commonStyles.text} grow  bg-light-secondary pr-2
            font-roboto   placeholder:text-light-input-placeholder
             focus:outline-none dark:bg-dark-secondary dark:text-dark-input-default dark:placeholder:text-dark-input-placeholder `}
          />
        </div>
        <div
          tabIndex="0"
          onBlur={handleArrowLostFocus}
          onMouseDown={() => {
            setHasFocusArrow(true);
          }}
          onTouchStart={() => {
            setHasFocusArrow(true);
          }}
        >
          <IconSelectArrow
            width={24}
            height={24}
            onClick={handleControlList}
            className={`${commonStyles.icon} outline-none ${isListVisible ? 'open rotate-180' : ''}`}
          />
        </div>
      </div>

      <div
        tabIndex="0"
        onBlur={handleListLostFocus}
        onMouseDown={handleListFocus}
        onTouchStart={handleListFocus}
      >
        <ul
          className={`absolute top-[87px] flex w-full flex-col gap-3 rounded-lg bg-light-secondary px-4 py-3
          font-roboto shadow-[0_5px_12px_rgba(115,115,115,0.1)] transition-all dark:border
          dark:border-dark-border dark:bg-dark-secondary dark:shadow-none ${
            isListVisible ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          {isLoadingData && (
            <p className="text-[16px] leading-[1.5] -tracking-[0.176px] text-light-input-default dark:text-dark-input-default">
              {t('loading')}
            </p>
          )}
          {validationMessage ? (
            <p className=" text-[16px] leading-[1.5] -tracking-[0.176px]   text-light-input-error">
              {t(validationMessage)}
            </p>
          ) : (
            displayedCities.map(city => (
              <li
                key={city}
                onClick={() => {
                  toggleCheck(city);
                }}
                className={`flex cursor-pointer list-none items-center
          justify-between px-2 py-0 ${
            selectedCities.includes(city)
              ? 'border-light-checkbox-check text-light-input-focus dark:border-dark-checkbox-check dark:text-dark-input-focus'
              : 'text-light-input-default dark:text-dark-input-default'
          }`}
              >
                {city}
                <div
                  data-city={city}
                  className={`flex  h-6 w-6  
                       items-center justify-center rounded border-[2px] transition-all ${
                         selectedCities.includes(city)
                           ? 'border-light-checkbox-check bg-light-checkbox-check dark:border-dark-checkbox-check dark:bg-dark-checkbox-check'
                           : 'border-light-checkbox-non_check dark:border-dark-checkbox-non_check'
                       }`}
                >
                  <IconCheckbox
                    width={16}
                    height={12}
                    className={`fill-light-primary transition-all dark:fill-dark-secondary ${
                      selectedCities.includes(city)
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
