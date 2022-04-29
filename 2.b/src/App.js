import { useState } from 'react'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Filter from './Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [displayList, setDisplayList] = useState(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setDisplayList={setDisplayList}/>
      <h2>submit entry</h2>
      <PersonForm persons={persons} setPersons={setPersons} setDisplayList={setDisplayList} />
      <h2>Numbers</h2>
      <Persons displayList={displayList} />
    </div>
  )
}

export default App