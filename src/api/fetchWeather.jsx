import axios from "axios"; 
const URLs = `https://api.openweathermap.org/data/2.5/weather?&APPID=ffd2778c181516f46a59c3503e6a3289`;
// const URL_forecast = `https://api.openweathermap.org/data/2.5/forecast?APPID=ffd2778c181516f46a59c3503e6a3289`
// const API_KEY = "ffd2778c181516f46a59c3503e6a3289"


export const fetchWeather = async (query) => {
  const {data} = await axios.get(URLs, {
    params: {
      q: query,
      units: "metric",
    }
  });
  const coor = [data.coord.lat, data.coord.lon, data.name, data.sys.country]
  
    
  // const {weather} = await axios.get(URL);
  return coor
}
export const oneCall = async (lat, lon) => {
  const {weather} = await axios.get(URL)
  return weather
}


