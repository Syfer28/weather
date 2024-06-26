import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "50vh",
  borderRadius: "5px",
};

const center = {
  lat: 56.9496122024984,
  lng: 24.113494457083455,
};

const options = {
  draggableCursor: "pointer",
  draggingCursor: "grab",
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

const Map = ({ setCoord }) => {
  const handleClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCoord({ lat, lng });
  };
  return (
    <LoadScript googleMapsApiKey="AIzaSyBqPQ9CS8VPW4HB05xiYiwgZCCcPduFkkE">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleClick}
        options={options}
      ></GoogleMap>
    </LoadScript>
  );
};

export default Map;
