import React from "react";
import "../country_card/CountryCard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCloud, faCloudSun, faCloudRain, faSnowflake, faLocationDot } from "@fortawesome/free-solid-svg-icons";

function CountryCard({ weatherData, isCelsius, onToggleTemperature }) {

    const temperature = isCelsius
    ? ((weatherData.temperature - 32) * 5) / 9
    : weatherData.temperature;

    let icon = null;
    switch (weatherData.condition) {
      case "Clear":
        icon = faSun;
        break;
      case "Clouds":
        icon = faCloud;
        break;
      case "Rain":
        icon = faCloudRain;
        break;
      case "Snow":
        icon = faSnowflake;
        break;
      default:
        icon = faCloudSun;
        break;
    }

  return (
        <div className="country-info-container">
         <div>
           <h2>{new Date().toLocaleString("en-GB", { weekday:'long' })}</h2>
           <p>{new Date().toLocaleString("en-GB", {  year: 'numeric', month: 'short', day: 'numeric' })}</p>
           <p><FontAwesomeIcon icon={faLocationDot}/> {weatherData.location}</p>
         </div>
         <div className="weather-info">
           <FontAwesomeIcon icon={icon} size="5x" />
           <h1 onClick={onToggleTemperature}>{Math.round(temperature)} <span className="is-celsius">{isCelsius ? "°C" : "°F"}</span></h1>
           <h3 className="condition">{weatherData.condition}</h3>
          </div>
        </div>
  );
}

export default CountryCard;
