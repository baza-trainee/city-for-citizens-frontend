'use client'
import { useState } from 'react';
import { cityArr } from './temporaryCities'; 
import Image from 'next/image';

function ChooseCity() {
  const [inputValue, setInputValue] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);


  function handleInputChange(event) {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
    const filtered = cityArr.filter(city => city.toLowerCase().startsWith(value));
    setFilteredCities(filtered);
    setIsListVisible(true);
  }

 function toggleCheck(city) {
  if(selectedCities.includes(city)){
    setSelectedCities((prev) => prev.filter(el => el !== city))
  } else{
    setSelectedCities((prev) => [...prev, city ])  
  }
 }

 function handleFocus() {
  if(!inputValue) {
    setFilteredCities(cityArr);
    setIsListVisible(true);
  }
 }

 function handleMouseLive() {
  setIsListVisible(false);
 }

 function handleMouseOver() {
  if(inputValue){
    setIsListVisible(true);
  }
 }

  return (
    <div 
      onMouseLeave={handleMouseLive}
      className='flex flex-col w-[164px]'
    >
      <label htmlFor='city' className='block mb-2'>Оберіть місто</label>
      <input
        id='city'
        type='text'
        name='city'
        placeholder='Місто'
        value={inputValue}
        onChange={handleInputChange}
        onMouseOver={handleMouseOver}
        onFocus={handleFocus}
        autoComplete='off'
        className={`relative z-10 pl-2 bg-gray/5 h-[44px] rounded-[8px] focus:outline-none border border-gray/20
        placeholder-gray/30 text-gray/80 ${isListVisible?'rounded-none rounded-t-lg border-gray/50':''}`}
      />

      {isListVisible && <ul className='custom-scroll absolute top-[75px] w-[164px] max-h-[300px] overflow-y-auto
       bg-gray/5 border rounded-b-lg border-gray/50'> 
        {filteredCities.map((city) => (
          <li key={city} className='flex py-0 px-2 list-none justify-between h-[44px] items-center border-b
          border-gray/50 last:border-b-0'>
            {city}
            <div onClick={e => toggleCheck(city, e.target)} data-city={city} className='flex w-[24px] h-[24px] 
            rounded-[4px] border border-gray/50 justify-center'>
            { selectedCities.includes(city) && <Image
              src="/done.svg"
              alt="done"
              width={16}
              height={16}
              priority
             />
            }
            </div>
          </li>
      ))}
      </ul>
      }
    </div>
  )
}
export default ChooseCity;