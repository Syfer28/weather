import React, { useState, useEffect } from "react";

const Weather = ({ coord }) => {
  const [temp, setTemp] = useState("");
  const [name, setName] = useState("");
  const [weatherCond, setWeatherCond] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");

  const lat = coord.lat;
  const lon = coord.lng;

  useEffect(() => {
    const API = "1371285a9ed2a80934229566f6a182e8";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setTemp(data.main.temp.toFixed());
        setWeatherCond(data.weather[0].main);
        setWeatherIcon(data.weather[0].icon);
        console.log(data);
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coord]);

  return (
    <div className="app">
      <h1>{name}</h1>
      <img
        src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
        alt="Weather icon"
      />
      <p>{weatherCond}</p>
      <p>{temp}°</p>
    </div>
  );
};

export default Weather;
