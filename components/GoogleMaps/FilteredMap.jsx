'use client';
import { useState, useEffect } from 'react';

import ChooseCity from './ChooseCity';
import DatePicker from './DatePicker';
import ChooseEventType from './ChooseEventType';
import Map from './Map';
import { cityArr } from './temporaryData/temporaryCities';

//TODO: change server Url
//const serverUrl = 'http://localhost:4000/filters';
const serverUrl =
  'https://7l55nnhl-4000.euw.devtunnels.ms/api/filters?locale=uk_UA';

function FilteredMap() {
  const [chooseCities, setChooseCities] = useState([]);
  const [chooseDate, setChooseDate] = useState([]);
  const [chooseEventType, setChooseEventType] = useState([]);
  const [serverData, setServerData] = useState({});

  useEffect(() => {
    fetch(`${serverUrl}`)
      .then(res => res.json())
      .then(data => {
        setServerData(data);
      });
  }, []);
  return (
    <>
      <section className="relative z-10 flex justify-center gap-5 mt-11 mb-[29px]">
        {console.log('serverData in return', serverData)}
        <ChooseCity
          setCities={setChooseCities}
          //TODO: delete mock Data: cityArr
          serverCity={
            serverData.eventCities && serverData.eventCities.length > 0
              ? serverData.eventCities
              : cityArr
          }
        />
        <DatePicker />
        <ChooseEventType setEventType={setChooseEventType} />
      </section>
      <Map citiesData={chooseCities} />
    </>
  );
}

export default FilteredMap;
