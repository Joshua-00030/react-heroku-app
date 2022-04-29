import { useState, useEffect } from 'react'
import peopleService from './services/people'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Filter from './Filter'

const App = () => {
  const [persons, setPersons] = useState([''])
  const [displayList, setDisplayList] = useState(persons)

  useEffect(() => {
    peopleService
    .getAll()
    .then(respose =>{
      setPersons(respose.data)
      setDisplayList(respose.data)
    })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    if(persons.includes(event.target[0].value))
    {
      console.log("in")
    }
    const personObject = {
      name: event.target[0].value,
      number: event.target[1].value,
      id: persons.length + 1,
    }    
    peopleService      
    .create(personObject)      
    .then(response => {        
      setPersons(persons.concat(response.data))
      setDisplayList(persons.concat(response.data))   
    })
  }
  const removePerson =(props) =>{
    if(window.confirm(`remove ${displayList[props-1].name} ?`)){
      peopleService.remove(props)
      setDisplayList(displayList.filter(person => person.id !==parseInt(props)))
    }
  }
  const updateNumber =(props) =>{
    peopleService.update(props.id, props)
    setDisplayList(displayList.map(person => person.id !== props.id ? person : props))
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setDisplayList={setDisplayList}/>
      <h2>submit entry</h2>
      <PersonForm persons={persons} addPerson={addPerson} updateNumber={updateNumber} />
      <h2>Numbers</h2>
      <Persons displayList={displayList} removePerson={removePerson} />
    </div>
  )
}

export default App