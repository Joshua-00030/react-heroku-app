import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
const ShowWeather = ({country}) => {
    const [weather, setWeather] = useState({})

    const weatherHook = () => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}&units=imperial `)
        .then(response => {
            console.log(response)
            setWeather(response.data)
        })
      }
    useEffect(weatherHook,[country])
    if(weather.main){
        return (
            <>
            <h1>Weather in {country.name.common}</h1>
            <div><b>Temperature:</b> {weather.main['temp']} F</div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0]['icon']}@2x.png`} alt={weather.current?.weather_descriptions[0]}/>
            <div><b>wind:</b> {weather.wind['speed']} mph direction {weather.wind['deg']}</div>
            </>
        )
    }
  }

export default ShowWeather