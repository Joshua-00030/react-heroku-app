import React, { useState, useEffect } from 'react'
import peopleService from './services/people'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Filter from './Filter'

const App = () => {
  const [persons, setPersons] = useState([''])
  const [displayList, setDisplayList] = useState(persons)
  const [verificationError, setVerificationError] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
      .then(respose => {
        setPersons(respose.data)
        setDisplayList(respose.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: event.target[0].value,
      phoneNumber: event.target[1].value,
      id: persons.length + 1,
    }

    setVerificationError('')

    if (persons.includes(event.target[0].value)) {
      peopleService
        .update(displayList.filter(person => person.name === personObject.name)[0].id, personObject)
    } else {
      peopleService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setDisplayList(persons.concat(response.data))
        })
        .catch(error => {
          setVerificationError(error.response.data.error)
        })
    }
  }
  const removePerson = (props) => {
    if (window.confirm(`remove ${displayList.filter(person => person.id === props)[0].name} ?`)) {
      peopleService.remove(props)
      setDisplayList(displayList.filter(person => person.id !== props))
      setPersons(displayList.filter(person => person.id !== props))
    }
  }
  const updateNumber = (props) => {
    peopleService.update(props.id, props).then(response => {
      setDisplayList(displayList.map(person => person.id !== response.data.id ? person : response.data))
    })
      .catch(error => {
        console.log(error.response.data)
      })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setDisplayList={setDisplayList} />
      <h2>submit entry</h2>
      <h2>{verificationError}</h2>
      <PersonForm persons={persons} addPerson={addPerson} updateNumber={updateNumber} />
      <Persons displayList={displayList} removePerson={removePerson} />
    </div>
  )
}

export default App