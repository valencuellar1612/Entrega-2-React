import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoding, setIsLoding] = useState(true)

  const succes = position => {
      const obj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
      setCoords(obj)
  }

  useEffect (() => {
    setIsLoding(true)
    navigator.geolocation.getCurrentPosition(succes)
  }, [])

  useEffect (() => {
    if(coords){
      const APIKEY ='492f5e401025e37c6b4ef5301aaf81dc'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
       axios.get(url)
          .then(res =>{
            const celsius = (res.data.main.temp - 273.15).toFixed(1)
            const fahrenheit =(celsius * 9/5 + 32).toFixed(1)
            setTemp({celsius, fahrenheit})
            setWeather(res.data)
          })
          .catch(err => console.log(err))
          .finally(() => setIsLoding(false))
    }
  }, [coords])

  return (
  <div className='app'>
    {
      isLoding
        ? <h2 className='app__loder'>Loading...❕🔄</h2>
        : 
      (<WeatherCard
      weather= {weather}
      temp = {temp}
    />)
    }
  </div>
  )
}

export default App
