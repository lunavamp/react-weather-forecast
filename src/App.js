import React, { useState, useEffect } from "react";
import WeatherCard from "./components/weather_card/WeatherCard";
import CountryCard from "./components/country_card/CountryCard";
import SearchBar from "./components/search_bar/SearchBar";
import DailyForecast from "./components/daily_forecast/DailyForecast";
import "./App.css";
import PuffLoader from "react-spinners/PuffLoader";
import clouds from './assets/clouds.png'
import sunny from './assets/sunny.png'
import rain from './assets/rain.png'
import snow from './assets/snow.png'

const API_KEY = "e4c6982bfa42f7e9ae3e51b622915ffe";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      const temperature = data.main.temp;
      const condition = data.weather[0].main;
      const location = data.name;
      const wind = Math.round(data.wind.speed);
      const humidity = data.main.humidity;
      const precipitation = Math.round(data.main.temp_max);
      setWeatherData({ temperature, condition, location, wind, humidity, precipitation });
      setErrorMessage(null);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=imperial`;
    fetchWeatherData(url);
      });
  }, []);

  const handleSearch = async (query) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=imperial`;
    fetchWeatherData(url);
  };

  const handleToggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <PuffLoader color={"rgb(136, 235, 239)"} cssOverride={{display: "block",
    margin: "300px auto"}} loading={isLoading} size={150} />
      </div>
    );
  }
  const background = () => {
    if (!weatherData) return; 
    switch (weatherData.condition) {
      case "Clear":
        return sunny;
      case "Clouds":
        return clouds;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      default:
        return sunny;
    }
  }
  
  return (
    <div className="App">
        {weatherData && (
          <div className="country-card bg" style={{ backgroundImage:`url(${background()}), linear-gradient(152.19deg, rgba(136, 235, 239, 0.9) -0.04%, rgba(83, 91, 230, 0.9) 100%)`}}>
            <CountryCard
              weatherData={weatherData}
              isCelsius={isCelsius}
              onToggleTemperature={handleToggleTemperature}
            />
          </div>
        )}
        <div className="weather-card">
          {weatherData && (
            <>
              <WeatherCard weatherData={weatherData} />
              <DailyForecast weatherData={weatherData} isCelsius={isCelsius} />
            </>
          )}
          <SearchBar onSearch={handleSearch} />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
  );
}

export default App;
