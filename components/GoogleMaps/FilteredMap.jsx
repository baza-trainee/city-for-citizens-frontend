'use client';
import { useState, useEffect } from 'react';

import ChooseCity from './ChooseCity';
import DatePicker from './DatePicker';
import ChooseEventType from './ChooseEventType';
import Map from './Map';
import { cityArr } from './temporaryData/temporaryCities';
import { cityCoordArr } from './temporaryData/temporaryCities_coordinate';

//TODO: change server Url
const filterUrl =
  'https://7l55nnhl-4000.euw.devtunnels.ms/api/filters?locale=uk_UA';
const eventUrl = 'https://7l55nnhl-4000.euw.devtunnels.ms/api/events';

function FilteredMap() {
  const [chooseCities, setChooseCities] = useState([]);
  const [chooseDate, setChooseDate] = useState([]);
  const [chooseEventType, setChooseEventType] = useState([]);
  const [serverData, setServerData] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  //TODO: delete cityPlusCoord
  const [cityPlusCoord, setCityPlusCoord] = useState([]);
  ///////////////////////

  function getParams(...filters) {
    const params = filters.filter(el => el !== '') || [];
    return params.length > 1 ? params.join('&') : params[0] || '';
  }

  function getCoordinates(serverEventData) {
    if (serverEventData && serverEventData.lenght > 0) {
      return serverEventData.map(el => el.event_address.coordinates);
    }
  }
  function checkServerAnswer(serverFilterData) {
    return serverFilterData.message ? '' : serverFilterData;
  }

  useEffect(() => {
    const city =
      chooseCities.length > 0 ? `city=${chooseCities.join(',')}` : '';
    const date = chooseDate.length > 0 ? `date=${chooseDate.join(',')}` : '';
    const eventType =
      chooseEventType.length > 0
        ? `eventType=${chooseEventType.join(',')}`
        : '';

    const params = getParams(city, date, eventType);

    const fetchData = async () => {
      try {
        const filterResponse = fetch(`${filterUrl}&${params}`, {
          mode: 'no-cors',
        }).then(res => {
          if (!res.ok) {
            throw new Error(`Request failed with status: ${res.status}`);
          }
          return res.json();
        });
        const eventResponse = fetch(`${eventUrl}?${params}`, {
          mode: 'no-cors',
        }).then(res => {
          if (!res.ok) {
            throw new Error(`Request failed with status: ${res.status}`);
          }
          return res.json();
        });

        const [filterData, eventData] = await Promise.all([
          filterResponse,
          eventResponse,
        ]);

        setServerData(checkServerAnswer(filterData));
        setCoordinates(getCoordinates(eventData));
      } catch {
        console.log('++++++++SERVER NOT WORKING in fetchData');
      }
    };

    const fetchFilterData = async () => {
      try {
        const filterResponse = await fetch(`${filterUrl}`, {
          mode: 'no-cors',
        });
        if (!filterResponse.ok) {
          throw new Error(
            `Request failed with status: ${filterResponse.status}`
          );
        }
        const filterData = await filterResponse.json();

        setServerData(checkServerAnswer(filterData));
      } catch {
        console.log('SERVER NOT WORKING in fetchFilterData');
      }
    };

    if (params) {
      fetchData().catch(
        console.log('SERVER NOT WORKING in fetchData condition params')
      );
    }
    if (!params) {
      setCoordinates([]);
      fetchFilterData().catch(
        console.log('SERVER NOT WORKING in fetchFilterData condition !params')
      );
      //TODO: delete
      setCityPlusCoord([]);
      //////
    }
    //TODO: delete mockdata

    if (params && Object.keys(serverData).length === 0) {
      const citiesData = cityCoordArr.filter(cityObj => {
        const cityName = Object.keys(cityObj)[0];
        return chooseCities.includes(cityName);
      });

      setCityPlusCoord(citiesData);
      setCoordinates([]);
    }

    ///////////////////////////
  }, [chooseCities, chooseDate, chooseEventType]);
  return (
    <>
      <section className="relative z-10 mb-[29px] mt-11 flex justify-center gap-5">
        <ChooseCity
          setCities={setChooseCities}
          //TODO: delete mock Data: cityArr
          serverCity={
            serverData.eventCities && serverData.eventCities.length > 0
              ? serverData.eventCities
              : cityArr
          }
        />
        <DatePicker
        //available event dates from server:
        //serverDates={serverData.eventDates}
        />
        <ChooseEventType
          setEventType={setChooseEventType}
          //type of events from server:
          //serverEventType={serverData.eventTypes}
        />
      </section>
      {/* TODO: delete citiesData={chooseCities} after server connection  */}
      <Map coordinates={coordinates} citiesData={cityPlusCoord} />
    </>
  );
}

export default FilteredMap;
