import React, { useState } from "react";
import "./Weather.css";
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [error, setError] = useState("");

  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");

  const API_KEY = "b4b4dfef05aee759cf84b32ae593e0cb";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  function handleOnChange(event) {
    setCity(event.target.value);
  }

  async function fetchData() {
    try {
      let response = await fetch(url);
      let output = await response.json();
      if (response.ok) {
        setWeather(output);
        setError("");
      } else {
        setError("No data found. Please Enter a Valid City name.");
      }
    } catch (error) {
      console.error("An Error Occurred:", error.message);
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  //converting time to 12hrs format
  const convertTime = (timeStr) => {
    const time = new Date(timeStr * 1000);
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="container">
      <div className="city">
        <input
          type="text"
          value={city}
          onChange={handleOnChange}
          placeholder="Enter city name"
          onKeyDown={handleKeyDown}
        ></input>
        <button onClick={() => fetchData()}>
          <FaSearch />
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {weather && weather.weather && (
        <div className="content">
          <div className="weather-image">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
            <h3 className="desc">{weather.weather[0].description}</h3>
          </div>

          <div className="weather-temp">
            <h2>
              {weather.main.temp}
              <span> &deg;C</span>
            </h2>
          </div>

          <div className="weather-city">
            <div className="location">
              <MdLocationOn />
            </div>
            <p>
              {weather.name},<span>{weather.sys.country}</span>
            </p>
          </div>

          <div className="sun_data">
            <div className="sun-rise">
              <div className="sun-icon">
                <FiSunrise />
              </div>

              <h3 className="sunrise-time">
                {convertTime(weather.sys.sunrise)}
                {/* <span>AM</span> */}
              </h3>
              <h3 className="heading">Sun Rise</h3>
            </div>
            <div className="sun-set">
              <div className="sun-icon">
                <FiSunset />
              </div>

              <h3 className="sunset-time">
                {convertTime(weather.sys.sunset)}
                {/* <span>PM</span> */}
              </h3>
              <h3 className="heading">Sun Set</h3>
            </div>
          </div>

          <div className="weather-stats">
            <div className="wind">
              <div className="wind-icon">
                <FaWind />
              </div>
              <h3 className="wind-speed">
                {weather.wind.speed}
                <span>Km/h</span>
              </h3>
              <h3 className="wind-heading">Wind Speed</h3>
            </div>
            <div className="humidity">
              <div className="humidity-icon">
                <WiHumidity />
              </div>
              <h3 className="humidity-percent">
                {weather.main.humidity}
                <span>%</span>
              </h3>
              <h3 className="humidity-heading">Humidity</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
