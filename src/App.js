import React, { useState, useEffect } from "react";
import "./App.css";

const api = {
  key: "cb34af209ce1dabfd70976a0af39ce53",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      // Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(data);
          console.log(weatherInfo);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  return (
    <>
      <div className="input-group">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for any city"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
        </form>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            weatherInfo.main && (
              <div className="container">
                <div className="weather-side">
                  <div className="weather-gradient"></div>
                  <div className="date-container">
                    <h2 className="date-dayname">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </h2>
                    <span className="date-day">
                      {new Date().toLocaleDateString()}
                    </span>
                    <span className="location">{weatherInfo.name}</span>
                  </div>
                  <div className="weather-container">
                    <h1 className="weather-temp">{weatherInfo.main.temp}°C</h1>
                    <h3 className="weather-desc">{weatherInfo.description}</h3>
                  </div>
                </div>
                <div className="info-side">
                  <div className="today-info-container">
                    <div className="today-info">
                      <div className="precipitation">
                        <span className="title">Feels Like - </span>
                        <span className="value">
                          {weatherInfo.main.feels_like}°C
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="humidity">
                        <span className="title">HUMIDITY - </span>
                        <span className="value">
                          {weatherInfo.main.humidity}%
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="wind">
                        <span className="title">WIND - </span>
                        <span className="value">
                          {weatherInfo.wind.speed} km/h
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="pressure">
                        <span className="title">PRESSURE - </span>
                        <span className="value">
                          {weatherInfo.main.pressure} mbar
                        </span>
                        <div className="clear"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </>
      )}
    </>
  );
}

export default App;
