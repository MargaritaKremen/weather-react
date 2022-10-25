import React from "react";
import "./Weather.css";
import Search from "./Search";
import WebFont from 'webfontloader';
useEffect(() => {
  WebFont.load({
    google: {
      families: ['Montserrat']
    }
  });
 }, []);

export default function Weather() {
  return (
    <div className="Weather">
      <div className="row">
        <div className="col-9">
          <Search />
          <h5>        
            <span >
             <a href = "https://github.com/MargaritaKremen/weather-react" class = "color-link" rel="noopener noreferrer" target="_blank"> Open-source code</a>
            </span> by Margarita Kozlova
          </h5>
        </div>        
      </div>      
    </div>
  );
}