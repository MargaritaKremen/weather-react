import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";

import "./Weather.css";

/*
import { HalfMalf } from "react-spinner-animated";
import 'react-spinner-animated/dist/index.css'
import Weather from "./Weather";
// eslint-disable-next-line
class MyComponent extends React.Component {
  render() {
    return <HalfMalf text={"Loading..."} bgColor={"#F0A500"} 
    center={false} width={"150px"} height={"150px"}/>
  }
}

*/
export default function WeatherSearch(props) {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  

  function displayWeather(response) {
    setLoaded(true);
    console.log(response.data.dt );
    setWeather({
      name: response.data.name,
      date: new Date(response.data.dt * 1000),
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
      
  );


  if (loaded) {
    
   // console.log(weather);
    return (
      <div>
        <div className="Weather">         
          <div className="col-9">
            {form} 
              <h1>{weather.name}</h1>
              <FormattedDate date={weather.date}/>
               <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-8">
                  <div className="temperature-container d-flex justify-content-end">                      
                           
                      <img className="icon" src={weather.icon} alt={weather.description} />                             
                          <span className="temperature">
                             {Math.round(weather.temperature)}
                          </span>
                          <span className="unit">°C</span>                               
                  </div>
                 </div>
                </div>
              <h3>{weather.description}</h3>
                <div> 
                  <ul>                    
                    <li>Humidity: {weather.humidity}%</li>
                    <li>Wind: {weather.wind}km/h</li>          
                  </ul>                  
                </div> 
          </div>              
        </div>        
      </div>         
    );
  } else {
    
    let apiKey = "f3a4c7fd1572e38d1a0b0f724e0e0218";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    return (
      <div> {form} </div>
  )
  }
}
