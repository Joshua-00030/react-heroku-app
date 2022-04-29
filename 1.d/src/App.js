import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [votes, setVotes] = useState(0)

  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const points = new Array(anecdotes.length).fill(0)
  const [aVotes, setaVotes] = useState(points)

  const [selected, setSelected] = useState(0)

  const Button = ({label, buttonType}) =>{
    return(
      <button onClick={buttonType}>{label}</button>
    )
  }

  const goodClick = () => {
    setGood(good + 1)
    setVotes(votes + 1)
  }
  const badClick = () => {
    setBad(bad + 1)
    setVotes(votes + 1)
  }
  const neutralClick = () => {
    setNeutral(neutral + 1)
    setVotes(votes + 1)
  }
  const randomAnecdote = () =>{
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const aVote = () =>{
    const copy = [...aVotes]
    copy[selected] += 1
    setaVotes(copy)
  }

  const Stats = () =>{
    if(votes === 0){
      return "No feedback given"
    }
    return(
      <>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="votes" value ={good} />
      <StatisticLine text="average" value ={(good - bad) / votes} />
      <StatisticLine text="positive" value ={((good / votes) * 100)} />
      </>
    )
  }

  const StatisticLine = ({text, value}) =>{
    if(text === "positive"){
      return(
        <>
        {text} {value} %
        <br/>
        </>
      )
    }
    return(
      <>
      {text} {value}
      <br/>
      </>
    )
  }

  const TopAnecdote = () =>{
    let max = 0
    let i = 0
    let j = 0
    aVotes.forEach(element => {
      if( element > max){
        max = element
        i = j
      }
      j++
    });
    return(
      <>
      {anecdotes[i]}<br/>
      Has {aVotes[i]} votes
      </>
    )
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br/>
      has {aVotes[selected]} votes
      <br/>
      <Button label={"next anecdote"} buttonType={randomAnecdote} />
      <Button label={"Vote"} buttonType={aVote} />
      <h2>Anecdote with most votes</h2>
      <TopAnecdote />
    </div>
  )
}

export default App