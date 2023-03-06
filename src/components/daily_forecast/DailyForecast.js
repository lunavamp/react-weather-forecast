import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCloud, faCloudSun, faCloudRain, faSnowflake } from "@fortawesome/free-solid-svg-icons";
import "../daily_forecast/DailyForecast.css"

function DailyForecast({ weatherData, isCelsius }) {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const API_KEY = "e4c6982bfa42f7e9ae3e51b622915ffe";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${weatherData.location}&appid=${API_KEY}&units=imperial`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        const dailyData = data.list.filter((item) => {
          return item.dt_txt.includes("12:00:00"); // Only get data for 12:00:00 PM for each day
        });

        setForecastData(dailyData.slice(0, 4)); // Get data for the next 4 days
      })
      .catch((error) => {
        console.log(error);
      });
  }, [weatherData]);

  const getIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <FontAwesomeIcon icon={faSun} />;
      case "Clouds":
        return <FontAwesomeIcon icon={faCloud} />;
      case "Rain":
        return <FontAwesomeIcon icon={faCloudRain} />;
      case "Snow":
        return <FontAwesomeIcon icon={faSnowflake} />;
      default:
        return <FontAwesomeIcon icon={faCloudSun} />;
    }
  };

  const getTemperature = (temperature) => {
    return isCelsius ? Math.round((temperature - 32) * (5 / 9)) : Math.round(temperature);
  };

  return (
    <div className="daily-forecast">
      {forecastData.map((item) => (
        <div key={item.dt} className="daily-forecast-item">
        <div className="forecast-icon">{getIcon(item.weather[0].main)}</div>
          <div className="forecast-date">{new Date(item.dt_txt).toLocaleDateString("en-GB", { weekday:'short' })}</div>
          <div className="forecast-temperature">{getTemperature(item.main.temp)} °{isCelsius ? "C" : "F"}</div>
        </div>
      ))}
    </div>
  );
}

export default DailyForecast;
