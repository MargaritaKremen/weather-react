import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    console.log(response.data.name);
    setLoaded(true);
    setWeather({
      name: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "f3a4c7fd1572e38d1a0b0f724e0e0218";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="Search">
      <form onSubmit={handleSubmit} className="formSearch">
        <input
          type="search"
          placeholder="Enter a city.."
          onChange={updateCity}
          className="search-field"
        />
        <button type="Submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <h1>{weather.name}</h1>
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          
        </ul> 
        <img src={weather.icon} alt={weather.description} />
      </div>
    );
  } else {
    return form;
  }
}
