import React from "react";
import "../weather_card/WeatherCard.css";

function WeatherCard({ weatherData}) {

  return (
        <div>
            <ul>
                <li>Precipitation <span className="li-fix">{weatherData.precipitation}%</span></li>
                <li>Humidity <span className="li-fix">{weatherData.humidity}%</span></li>
                <li>Wind <span className="li-fix">{weatherData.wind} km/h</span></li>
            </ul>
        </div>
  );
}

export default WeatherCard;
