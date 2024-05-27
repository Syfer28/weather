import React, { useState, useEffect } from "react";
import styles from "../styles/Weather.module.css";

const Weather = ({ coord }) => {
  const [name, setName] = useState("");
  const [temp, setTemp] = useState("");
  const [feelsTemp, setFeelsTemp] = useState("");
  const [weatherCond, setWeatherCond] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");

  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [gust, setGust] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [timezone, setTimezone] = useState("");

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
        setFeelsTemp(data.main.feels_like.toFixed());
        setWeatherCond(data.weather[0].main);
        setWeatherIcon(data.weather[0].icon);
        setHumidity(data.main.humidity);
        setWind((data.wind.speed * 3.6).toFixed());
        setGust(data.wind?.gust ? (data.wind.gust * 3.6).toFixed() : "");
        setTempMin(data.main.temp_min.toFixed());
        setTempMax(data.main.temp_max.toFixed());
        setSunrise(data.sys.sunrise);
        setSunset(data.sys.sunset);
        setTimezone(data.timezone);
        console.log(data);
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coord]);

  const formatUnix = (timestamp, offset) => {
    const date = new Date((timestamp + offset) * 1000); // Применение смещения
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  if (!coord || !coord.lat || !coord.lng) {
    return <div>Choose point on the map.</div>;
  }

  return (
    <div className="app">
      <p className={styles.name}>{name}</p>
      <div className={styles.bodyContainer}>
        <div className={styles.rightContainer}>
          <div className={styles.rightContainer_up}>
            <div className={styles.iconContainer}>
              <img
                className={styles.icon}
                src={`https://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
                alt="Weather icon"
              />
            </div>

            <div className={styles.tempContainer}>
              <p className={styles.temp}>{temp}°</p>
              <p className={styles.feelsTemp}>Feels like {feelsTemp}°</p>
            </div>
          </div>
          <div className={styles.rightContainer_down}>
            <p>{weatherCond}</p>
          </div>
        </div>
        <div className={styles.leftContainer}>
          <div className={styles.singleContainer}>
            <p className={styles.label}>Humidity</p>
            <p className={styles.humidity}>{humidity}%</p>
          </div>
          <div className={styles.doubleContainer}>
            <div className={styles.singleContainer}>
              <p className={styles.label}>Min temperature</p>
              <p className={styles.tempMin}>{tempMin}°</p>
            </div>
            <div className={styles.singleContainer}>
              <p className={styles.label}>Max temperature</p>
              <p className={styles.tempMax}>{tempMax}°</p>
            </div>
          </div>
          <div className={styles.doubleContainer}>
            <div className={styles.singleContainer}>
              <p className={styles.label}>Wind speed</p>
              <p className={styles.wind}>{wind}km/h</p>
            </div>

            <div className={styles.singleContainer}>
              <p className={styles.label}>Gust speed</p>
              <p className={styles.gust}>{gust ? `${gust}km/h` : "No data"}</p>
            </div>
          </div>
          <div className={styles.doubleContainer}>
            <div className={styles.singleContainer}>
              <p className={styles.label}>Sunrise</p>
              <p className={styles.sunrise}>{formatUnix(sunrise, timezone)}</p>
            </div>

            <div className={styles.singleContainer}>
              <p className={styles.label}>Sunset</p>
              <p className={styles.sunset}>{formatUnix(sunset, timezone)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
