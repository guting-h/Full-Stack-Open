import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
    return (
      <tbody>
        <tr> 
          <td> {props.text} </td>
          <td> {props.value} </td>
        </tr>
      </tbody>
    )
}

const Statistics = ({good, neutral, bad, sum}) => {
  if (sum === 0) {
    return (
      <div>
        No feedback given.
      </div>
    )
  }

  return(
    <div>
      <table>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value={sum}/>
      <StatisticLine text="average" value={(good-bad)/(sum)}/>
      <StatisticLine text="positive" value={100*good/(sum)+ " %"}/>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)

  const handleNeutralClick = () => setNeutral(neutral + 1)

  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h2>Give us your feedback</h2>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} sum={good+neutral+bad}/>
    </div>
  )
}

export default App
