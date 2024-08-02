  import React, { useState } from "react";
import './App.css';
import axios from "axios";
import { fetchWeather } from "./api/fetchWeather";


export default function App() {
  const [query, setQuery] = useState("");
  const [foreQuery, setforeQuery] = useState({});
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      const URL = `https://api.openweathermap.org/data/3.0/onecall?APPID=ffd2778c181516f46a59c3503e6a3289&lat=${data[0]}&lon=${data[1]}&cnt=3&units=metric`

      const fore = await axios.get(URL)
      setWeather(data);
      setforeQuery(fore.data);
      setQuery("");
    }
  }


  return (<>
    <input
      type="text"
      className="search"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyPress={search}
    />
    
      {foreQuery.current && (
        <div className="today-weather">
          <div className="city">
            <div className="text">
              <h1 className="city-name">
                <span>{weather[2]}</span>
                <sup className="country">{weather[3]}</sup>
              </h1>
              <h3>{foreQuery.current.weather[0].description}</h3>
            </div>
            <div className="city-temp">
              <span>
                {Math.round(foreQuery.current.temp)}
                <sup className="celsius">&deg;C</sup>
              </span>
              <img className="city-icon" src={`https://openweathermap.org/img/wn/${foreQuery.current.weather[0].icon}@2x.png`} alt={foreQuery.current.weather[0].description} />
            </div>

          </div>
          {foreQuery["alerts"] != undefined && (
            <>
              <div className="alerts">
                <h2 className="alert-title">Alerts</h2>
                <section>{foreQuery["alerts"].map(t =>
                  <>
                    <h3 className="alert-subtitle">{t.tags}</h3>
                    <h4 className="alert-description">{t.event}</h4>
                    <p className="cutoff-text alert-text">{t.description}</p>
                  </>)}</section>
              </div>
            </>
          )}
        </div>
      )
      }

    {foreQuery["daily"] && (
      <>
        <div className="forecasts-space">
          {foreQuery["daily"].map(t =>
            <div className="days">
              <h3 className="dates">{new Date(t.dt * 1000).toLocaleDateString("en-GB",{day: "numeric", weekday: "short",month: "short",})}</h3>
              <img className="city-icon" src={`https://openweathermap.org/img/wn/${t["weather"]["0"]["icon"]}@2x.png`} alt={t["weather"]["0"]["description"]} />
              <div className="temp-forecast">
                {Math.round(t["temp"]["min"])}/{Math.round(t["temp"]["max"])}
                <sup className="celsius">&deg;C</sup>
              </div>
              <h4 className="tag-forecast">{t["weather"]["0"]["main"]}</h4>
            </div>
          )}
        </div>

      </>
    )}
  </>
  )
}
