import { useState, useEffect } from 'react'
import axios from 'axios'

//Shows weather of the capital ciy only if the captial exists
//Doesn't work for some cases such as Antarctica
const CountryPage = ({countryObj}) => {  
    const capital = typeof countryObj.capital !== 'undefined' ? countryObj.capital : 'No capital'
    return (
      <div> 
        <h1>{countryObj.name.common}</h1>
        region: {countryObj.region} <br></br>
        capital: {capital} <br></br>
        area: {countryObj.area} <br></br>
        population: {countryObj.population}
        <h2>languages:</h2>
        <ul>
          {Object.values(countryObj.languages).map((language, i) => <li key={i}>{language}</li>)}
        </ul>
        <img 
          src={countryObj.flags.png}
          alt="Flag"
        />
        {countryObj.capital && Object.keys(countryObj.capitalInfo).length !== 0 && (<div> 
            <h2>Weather in {capital}</h2>
            <WeatherInfo lat={countryObj.capitalInfo.latlng[0]} lng={countryObj.capitalInfo.latlng[1]}/>
        </div>)}
      </div>
    )
}

const WeatherInfo = ({lat, lng}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weatherData, setWeatherData] = useState()

    useEffect(() => {
        axios
          .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`)
          .then(response => {
            console.log('weather data retrieved')
            setWeatherData(response.data)
          })
    }, [])

    if (weatherData) {
        return (
            <div>
            Current temperature is {weatherData.current.temp}℃ <br></br>
            <img 
                src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                alt="Flag"
            /> <br></br>
            Wind speed {weatherData.current.wind_speed} m/s
            </div>
        )
    } else {
        return <p>Loading...</p>
    }
    
}

export default CountryPage