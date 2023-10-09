'use client';
import { useState, useEffect } from 'react';
import { cityArr } from './temporaryData/temporaryCities';
import { cityCoordArr } from './temporaryData/temporaryCities_coordinate';

const ukr = {
  label: 'Оберіть місто',
  placeholder: 'Місто',
};

function ChooseCity({ setCities }) {
  const [inputValue, setInputValue] = useState('');
  const [isListVisible, setIsListVisible] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
    const citiesData = cityCoordArr.filter(cityObj => {
      const cityName = Object.keys(cityObj)[0];
      return selectedCities.includes(cityName);
    });
    setCities(citiesData || []);
  }, [selectedCities, setCities]);

  function handleInputChange(event) {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
    const filtered = cityArr.filter(city =>
      city.toLowerCase().startsWith(value)
    );
    setFilteredCities(filtered);
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
      setFilteredCities(cityArr);
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
    <div onMouseLeave={handleMouseLive} className="flex flex-col w-[164px]">
      <label htmlFor="city" className="block mb-2">
        {ukr.label}
      </label>
      <input
        id="city"
        type="text"
        name="city"
        placeholder={selectedCities.join(', ') || ukr.placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onMouseOver={handleMouseOver}
        onFocus={handleFocus}
        autoComplete="off"
        className={`relative z-10 pl-2 h-11 rounded-[8px] focus:outline-none border border-gray/20
        placeholder-gray/30 dark:placeholder-gray/20 placeholder:w-[130px] text-ellipsis text-gray/80 bg-gray/5 dark:bg-gray/100
        ${
          isListVisible
            ? 'rounded-none rounded-t-lg border-gray/50 dark:border-gray/10 dark:text-gray/10'
            : ''
        }`}
      />

      {isListVisible && (
        <ul
          className="custom-scroll absolute top-[75px] w-[164px] max-h-[300px] overflow-y-auto
       bg-gray/5 border rounded-b-lg border-gray/50  dark:bg-gray/100 dark:border-gray/10 dark:text-gray/10 dark:dark-scroll"
        >
          {filteredCities.map(city => (
            <li
              key={city}
              className="flex py-0 px-2 list-none justify-between h-11 items-center border-b
          border-gray/50 dark:border-gray/10 last:border-b-0"
            >
              {city}
              <div
                onClick={e => toggleCheck(city, e.target)}
                data-city={city}
                className="flex w-6 h-6 
            rounded border border-gray/50 dark:border-gray/10 justify-center items-center"
              >
                <svg
                  className={`stroke-gray/50 dark:stroke-gray/20 transition-all ${
                    selectedCities.includes(city) ? 'opacity-100' : 'opacity-0'
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
  );
}
export default ChooseCity;
