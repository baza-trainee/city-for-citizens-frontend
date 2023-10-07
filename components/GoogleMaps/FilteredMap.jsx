'use client'
import { useState, useEffect} from 'react';

import ChooseCity from './ChooseCity';
import DatePicker from './DatePicker';
import Map from './Map';

function FilteredMap() {
  const [chooseCities, setChooseCities] = useState([]);
  const [chooseDate, setDate] = useState([]);

  return(
    <>
      <section className="relative z-10 flex justify-center gap-5 mt-11 mb-[29px]">
        <ChooseCity setCities={setChooseCities}/>
        <DatePicker />
      </section>
      <Map citiesData={chooseCities}/>
    </>
  )
}

export default FilteredMap;