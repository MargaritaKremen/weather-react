import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import WeatherForecast from "./WeatherForecast";
import "./Weather.css";
import logo from './logo.gif'

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
    let apiKey = "t201833cf0oa3a813cc38bf42a4223bb";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
      <form onSubmit={handleSubmit} className="formSearch ">
        <input
          type="search"
          placeholder="   Enter a city.."
          onChange={updateCity}
          className="search-field col-9"
        />
        <button type="Submit" className="search-button col-3">
          Search
        </button>
      </form>
      
  );


  if (loaded) {
    
    console.log(weather);
    return (
      <div>
        <div className="Weather"> 
            {form} 
            <div className="row">
                <div className="col-6 text-center">
                  
                  <h1>{weather.name}</h1>
                  <FormattedDate date={weather.date}/>
                  
                    
                        <div className="temperature-container d-flex justify-content-center">                      
                        <WeatherIcon code={weather.icon} size={52} color={'#dce9ef'}/>                                                    
                              <span className="temperature">
                                {Math.round(weather.temperature)}
                              </span>
                              <span className="unit">??C</span>                               
                        </div>
                                 
                      <h4 className="text-capitalize" >{weather.description}</h4>
                        <div> 
                          <ul>                    
                            <li>Humidity: {weather.humidity}%</li>
                            <li>Wind: {weather.wind}km/h</li>          
                          </ul>                  
                        </div> 
                  </div>

                  <div className="col-6">
                    <img src={logo} className="logo" alt="loading..." />
                  </div>
            </div>

        <WeatherForecast coordinates={weather.coordinates} city={weather.name}/>         
        </div>        
      </div>         
    );
  } else {
    console.log(weather);
    let apiKey = "t201833cf0oa3a813cc38bf42a4223bb";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${props.defaultCity}&key=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(displayWeather);
    return (
      <div> {form} </div>
  )
  }
}
