import { useState, useEffect } from 'react'
import axios from 'axios'

//either renders a list of country names or redirect to a country's specific "page"
const Countries = ({countries, countriesToShow}) => {
  if (countries) {
    const countryData = countriesToShow()
    if (typeof countryData[0] === 'object') {
      return <CountryPage countryObj={countryData[0]}/>
    } else {
      return countryData.map((content, i) => <div key={i}>{content}</div>)
    }
  } else {
    return <p>Loading...</p>
  }
}

const CountryPage = ({countryObj}) => {
  //console.log("starting countryPage")
  return (
    <div> 
      <h1>{countryObj.name.common}</h1>
      capital: {countryObj.capital} <br></br>
      area: {countryObj.area}
      <h2>languages:</h2>
      <ul>
        {Object.values(countryObj.languages).map((language, i) => <li key={i}>{language}</li>)}
      </ul>
      <img 
        src={countryObj.flags.png}
        alt="Flag"
      />
    </div>
  )
}
    

const Query = ({query, handleQuery}) =>
    <input value={query} onChange={handleQuery}/>

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
  //console.log("Looking at the first element:", countries[0])

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
    } else if (noOfFit <= 10 && noOfFit >1 ) {
      return filtered.map(country => country.name.common)
    } else if (noOfFit === 1) {
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

