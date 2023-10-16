'use client';
import { useState, useEffect } from 'react';

import ChooseCity from './ChooseCity';
import DatePicker from './DatePicker/DatePicker';
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
      })
      .catch(error => error);
  }, []);
  return (
    <>
      <section className="container relative z-10 mb-[29px] mt-11 flex flex-col justify-center gap-5 tablet:flex-row">
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
        <DatePicker setDate={setChooseDate} />
        <ChooseEventType setEventType={setChooseEventType} />
      </section>
      <Map citiesData={chooseCities} />
    </>
  );
}

export default FilteredMap;
