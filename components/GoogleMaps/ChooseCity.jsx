'use client';
import { useQueryParam } from '@/hooks';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

function ChooseCity({ filtersEventCities }) {
  const [inputValue, setInputValue] = useState('');
  const [isListVisible, setIsListVisible] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCities, setSelectedCities] = useQueryParam('city');

  const t = useTranslations('Filters.ChooseCity');

  function handleInputChange(event) {
    const value = event.target.value.toLowerCase();
    setInputValue(value);

    const filtered = filtersEventCities.filter(city =>
      city.toLowerCase().startsWith(value)
    );
    setFilteredCities(filtered || []);
    setIsListVisible(true);
  }

  function toggleCheck(city) {
    if (selectedCities.includes(city)) {
      setSelectedCities(prev => prev.filter(el => el !== city));
    } else {
      setSelectedCities(prev => [...prev, city]);
    }
  }

  function handleFocus() {
    if (!inputValue) {
      setFilteredCities(filtersEventCities);
      setIsListVisible(true);
    }
  }

  function handleMouseLive() {
    setIsListVisible(false);
  }

  function handleMouseOver() {
    if (inputValue) {
      setIsListVisible(true);
    }
  }

  return (
    <>
      <div onMouseLeave={handleMouseLive} className="flex w-[164px] flex-col">
        <label htmlFor="city" className="mb-2 block">
          {t('label')}
        </label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder={selectedCities.join(', ') || t('defaultValue')}
          value={inputValue}
          onChange={handleInputChange}
          onMouseOver={handleMouseOver}
          onFocus={handleFocus}
          autoComplete="off"
          className={`relative z-10 h-11 text-ellipsis rounded-[8px] border border-gray/20 bg-gray/5
        pl-2 text-gray/80 placeholder-gray/30 placeholder:w-[130px] focus:outline-none dark:bg-gray/100 dark:placeholder-gray/20
        ${
          isListVisible
            ? 'rounded-none rounded-t-lg border-gray/50 dark:border-gray/10 dark:text-gray/10'
            : ''
        }`}
        />

        {isListVisible && (
          <ul
            className="custom-scroll dark:dark-scroll absolute top-[75px] z-10 max-h-[300px] w-[164px]
       overflow-y-auto rounded-b-lg border border-gray/50  bg-gray/5 dark:border-gray/10 dark:bg-gray/100 dark:text-gray/10"
          >
            {filteredCities.map(city => (
              <li
                key={city}
                className="flex h-11 list-none items-center justify-between border-b border-gray/50 px-2
          py-0 last:border-b-0 dark:border-gray/10"
              >
                {city}
                <div
                  onClick={e => toggleCheck(city, e.target)}
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
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
export default ChooseCity;
