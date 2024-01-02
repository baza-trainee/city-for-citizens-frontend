'use client';
import { useQueryParam } from '../../../hooks';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

function ChooseCity({ filtersEventCities }) {
  const [inputValue, setInputValue] = useState('');
  const [isListVisible, setIsListVisible] = useState(false);
  const [isInputTyping, setIsInputTyping] = useState(false);
  const [displayedCities, setDisplayedCities] = useState([]);
  const [selectedCities, setSelectedCities] = useQueryParam('city');

  const t = useTranslations('Filters.ChooseCity');

  useEffect(() => {
    setInputValue(selectedCities.join(', '));
  }, [selectedCities]);

  function handleInputChange(event) {
    const value = event.target.value;
    setInputValue(value);
    setIsInputTyping(true);
    const filteredCities = filteredCityByInputValue(value);
    setDisplayedCities(filteredCities);
    setIsListVisible(true);
  }

  function toggleCheck(city) {
    if (selectedCities.includes(city)) {
      setSelectedCities(prev => prev.filter(el => el !== city));
    } else {
      setSelectedCities(prev => [...prev, city]);
    }
    setDisplayedCities(filtersEventCities);
  }

  function handleFocus() {
    if (inputValue && !isInputValueIncludesCityFrom(filtersEventCities)) {
      setDisplayedCities(selectedCities);
    } else {
      setInputValue('');
      setIsInputTyping(false);
      setDisplayedCities(filtersEventCities);
    }
  }

  function handleMouseLive() {
    setIsListVisible(false);
    if (
      inputValue &&
      !isInputValueIncludesCityFrom(filtersEventCities) &&
      filteredCityByInputValue(inputValue).length === 0
    ) {
      if (selectedCities.length) {
        setInputValue(selectedCities.join(', '));
      } else {
        setInputValue('');
      }
      setIsInputTyping(false);
    }
    if (!inputValue && selectedCities.length) {
      setInputValue(selectedCities.join(', '));
      setIsInputTyping(false);
    }
  }

  function handleMouseOver() {
    setIsListVisible(true);
    if (inputValue) {
      const filteredCities = filteredCityByInputValue();
      switch (true) {
        case !isInputValueIncludesCityFrom(filtersEventCities) &&
          !filteredCities.length:
          setInputValue('');
          setIsInputTyping(false);
          setDisplayedCities(filtersEventCities);
          break;
        case isInputValueIncludesCityFrom(filtersEventCities) && isInputTyping:
          setIsInputTyping(false);
          setDisplayedCities(filteredCities);
          break;
        case isInputValueIncludesCityFrom(selectedCities) &&
          selectedCities.length === inputValue.split(', ').length &&
          !isInputTyping:
          setDisplayedCities(filtersEventCities);
          break;
        default:
          setDisplayedCities(filteredCities);
      }
    } else {
      setDisplayedCities(filtersEventCities);
    }
  }

  function handleOnclick() {
    if (
      isInputValueIncludesCityFrom(filtersEventCities) ||
      filteredCityByInputValue(inputValue).length === 0
    ) {
      setInputValue('');
      setDisplayedCities(filtersEventCities);
    }
    setIsListVisible(true);
  }

  function filteredCityByInputValue(value = inputValue) {
    if (value || inputValue) {
      const valueToLowerCase = value.toLowerCase();
      return filtersEventCities.filter(city =>
        city.toLowerCase().startsWith(valueToLowerCase)
      );
    }
    return [];
  }

  function isInputValueIncludesCityFrom(cityArr) {
    return inputValue
      .split(', ')
      .every(value =>
        cityArr.includes(value.replace(/^[\wа-я]/, char => char.toUpperCase()))
      );
  }

  return (
    <div
      onMouseLeave={handleMouseLive}
      className="relative flex w-full flex-col tablet:w-[264px]"
    >
      <label className="mb-2 block">{t('label')}</label>
      <input
        id="city"
        type="text"
        name="city"
        placeholder={t('defaultValue')}
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleOnclick}
        onMouseOver={handleMouseOver}
        onFocus={handleFocus}
        autoComplete="off"
        className={`relative z-10 h-11 text-ellipsis rounded-[8px] border border-gray/20 bg-gray/5
        pl-2 text-gray/80 placeholder-gray/30 placeholder:w-[130px] focus:outline-none dark:bg-gray/100 dark:text-gray/10 dark:placeholder-gray/20
        ${
          isListVisible
            ? 'rounded-none rounded-t-lg border-gray/80 dark:border-gray/10 dark:bg-gray/100 dark:text-gray/10'
            : ''
        }`}
      />
      {isListVisible && (
        <ul
          className="custom-scroll dark:dark-scroll absolute top-[75px] z-10 max-h-[300px] w-full
       overflow-y-auto rounded-b-lg border border-gray/50  bg-gray/5 dark:border-gray/10 dark:bg-gray/100 dark:text-gray/10"
        >
          {displayedCities.length === 0 ? (
            <p className="p-[10px] text-[16px] leading-[1.5] -tracking-[0.176px] text-gray/50 dark:text-gray/10">
              {t('textIsEmpty')}
            </p>
          ) : (
            displayedCities.map(city => (
              <li
                key={city}
                onClick={() => toggleCheck(city)}
                className="flex h-11 list-none items-center justify-between border-b border-gray/50 px-2
          py-0 last:border-b-0 dark:border-gray/10"
              >
                {city}
                <div
                  data-city={city}
                  className="flex h-6 w-6 
            items-center justify-center rounded border border-gray/50 dark:border-gray/10"
                >
                  <svg
                    className={`stroke-gray/50 transition-all dark:stroke-gray/20 ${
                      selectedCities.includes(city)
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                    width={16}
                    height={16}
                  >
                    <use href="icons/sprite.svg#icon-checkbox"></use>
                  </svg>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
export default ChooseCity;
