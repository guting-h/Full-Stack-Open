import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then((response => {
          console.log(response.data)
        })).catch( error => {
          console.log(error)
        })
    }
    
  }, [name])

  return country
}