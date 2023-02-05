import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then((response => {
          setCountry({...response.data[0], found: true})
        })).catch( error => {
          setCountry({found: false})
          console.log(error)
        })
    }
    
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }


  if (!country.found) {
    return (
      <div> 
        country not found ...
      </div>
    )
  }

  return (
    <div> 
      <h2>{country.name.common}</h2>
      <div>
        capital: {country.capital[0]} <br/>
        population: {country.population} <br/>
        <img 
          src={country.flags.png}
          alt={country.flags.alt}
            />
      </div>
    </div> 
  )
  
}

const App = () => {
  const countryName = useField('text')
  const [name, setName] = useState('')
  const countryData = useCountry(name)

  const handleSearch = (event) =>{
    event.preventDefault()
    setName(countryName.value)
  }

  return (
    <div>
      <h2>Countries</h2>

      <form onSubmit={handleSearch}>
        <input {...countryName} />
        <button>find</button>
      </form>
      <Country country={countryData} />
    </div>
  )
}

export default App

