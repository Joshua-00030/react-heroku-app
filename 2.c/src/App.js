import { useState, useEffect } from 'react'
import Persons from './Persons'
import axios from 'axios'

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [displayList, setDisplayList] = useState(countries)
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState('')

  const hook = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }
    
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setDisplayList([...countries].filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      Find Countries: <input value={filter} onChange={handleFilterChange} />
      <h2>Countries</h2>
      <Persons displayList={displayList} handleFilterChange={handleFilterChange}/>
    </div>
  )
}

export default App