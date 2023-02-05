import { useState } from 'react'
import CountryPage from './countryPage'

//either renders a list of country name options or redirect to a country's specific "page"
const Countries = ({countries, countriesToShow}) => {
    if (countries) {
      const countryData = countriesToShow()
      if (typeof countryData[0] === 'object' && countryData.length === 1) {
        return <CountryPage countryObj={countryData[0]}/>
      } else if (typeof countryData[0] === 'object') {
        return countryData.map((country,i) => <CountryOption key={i} countryObj={country}/>)
      } else {
        return countryData.map((content, i) => <div key={i}>{content}</div>)
      }
    } else {
      return <p>Loading...</p>
    }
}
  
const CountryOption = ({countryObj}) => {
    const [isShown, setShown] = useState(false)
  
    const handleClick = () => {
      setShown(current => !current);
    };
  
    const showPage = () => {
      return <CountryPage countryObj={countryObj}/>
    }
  
    return (
      <div> 
      {countryObj.name.common} 
      <button onClick={handleClick}>show</button>
      {isShown && showPage()}
      </div>
    )
}

export default Countries