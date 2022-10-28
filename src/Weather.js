import React from "react";

import Search from "./Search";

export default function Weather() {
  return (
  <div>
   
    <Search defaultCity = "Cascais" />   
      <h5>        
        <span >
        <a href = "https://github.com/MargaritaKremen/weather-react" class = "color-link text-center" rel="noopener noreferrer" target="_blank"> Open-source code</a>
        </span> by Margarita Kozlova
    </h5>
  </div>
  );
}