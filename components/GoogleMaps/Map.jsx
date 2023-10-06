"use client";

import React, {useState, useEffect} from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "865px",
};

const center = {
  lat: 49.04761451133044,
  lng: 31.387372519412626,
};

const Map = ({citiesData}) => {
  console.log("citiesData in Map:", citiesData);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });
  const [markers, setMarkers] = useState([]);
  
  useEffect(() => {
    if (isLoaded) {
      const markers = citiesData.map((cityObj) => {
        const cityName = Object.keys(cityObj)[0];
        const [lat, lng] = cityObj[cityName];
        return (
              <MarkerF 
                key={cityName}
                position={{
                  lat,
                  lng,
                }}
              />
            );
      });
      setMarkers(markers);
    }
  }, [isLoaded, citiesData]);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6.5}>
     {markers}    
    
      {/* <MarkerF
        position={{
          lat: 49.047614511330444,
          lng: 31.387372519412626,
        }}
      />
       <MarkerF
        position={{
          lat: 50.443310,
          lng: 30.518350,
        }}
      /> */}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
