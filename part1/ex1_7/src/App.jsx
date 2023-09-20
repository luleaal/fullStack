import { useState } from 'react'
import Button from './Button'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const setToGood = newValue => {
    setGood(newValue)
    setToAll(1)
  }

  const setToNeutral = newValue => {
    setNeutral(newValue)
    setToAll(1)
  }

  const setToBad = newValue => {
    setBad(newValue)
    setToAll(1)
  }

  const setToAll = newValue => {
    setAll(all+newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <h1>Statistics</h1>
      <div>good: {good}</div>
      <div>neutral: {neutral}</div>
      <div>bad: {bad}</div>
      <div>all: {all}</div>
      <div>average: {(good*1 + neutral*0 + bad*(-1))/3}</div>
      <div>positive: {(good/all)*100}%</div>
    </div>
  )
}

export default App