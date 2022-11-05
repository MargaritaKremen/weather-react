import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import WeatherForecast from "./WeatherForecast";
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
    
    setWeather({
      name: response.data.city,
      coordinates: response.data.coordinates,
      date: new Date(response.data.time * 1000),
      temperature: response.data.temperature.current,
      wind: response.data.wind.speed,
      humidity: response.data.temperature.humidity,
      icon: response.data.condition.icon,
      description: response.data.condition.description,
    });
  }

  function handleSubmit(event) {
  
    event.preventDefault();
    let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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
    
    console.log(weather);
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
                  <WeatherIcon code={props.data.icon} size={52} />   
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
          <WeatherForecast coordinates={weather.coordinates} city={weather.name}/>         
        </div>        
      </div>         
    );
  } else {
    console.log(weather);
    let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${props.defaultCity}&key=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(displayWeather);
    return (
      <div> {form} </div>
  )
  }
}
