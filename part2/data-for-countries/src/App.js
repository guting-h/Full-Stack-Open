import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/countries'

const Query = ({query, handleQuery}) =>
    <input value={query} onChange={handleQuery} />

const App = () => {
  const [countries, setCountries] = useState() 
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const toArray = (obj)  => {
    const result = [];
    for (const prop in obj) {
        const value = obj[prop];
        typeof value === 'object'
        ?result.push(toArray(value))
        :result.push(value);
    }
    return result.flat();
  } 

  //process country data by query and pass them accordingly to the Countries component
  const countriesToShow = () => {
    const filtered = countries.filter(country => toArray(country.name).some(c => c.toLowerCase().includes(query.toLowerCase())))
    const noOfFit = filtered.length
    if (noOfFit > 10) {
      return ["Too many matches, specify another filter"]
    } else if (noOfFit <= 10 && noOfFit >=1 ) {
      return filtered
    } else {
      return ["No match"]
    }
  }
    
  const handleQuery = (event) => setQuery(event.target.value)

  return (
    <div>
      find countries: <Query query={query} handleQuery={handleQuery}/>
      <Countries countries={countries} countriesToShow={countriesToShow}/>
    </div>
  )
}

export default App

