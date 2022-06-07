import { useState } from "react"

const PersonForm =({persons, setPersons, setDisplayList}) =>{
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
  
    const addPerson =(event) => {
      event.preventDefault()
      if (persons.find(a => a.name === newName)!== undefined){
        alert(`${newName} is already added to phonebook`)
      }
      else{
           console.log({persons})
           setPersons(persons.concat({name: newName,number: newNumber, id: persons.length + 1}))
           setDisplayList(persons.concat({name: newName,number: newNumber, id: persons.length + 1}))
      }
      setNewName('')
      setNewNumber('')
    }
    const handleNameChange = (event) => {
      setNewName(event.target.value)  
    }
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)  
    }
    return(
        <form onSubmit={addPerson}>
        <div>
            Name: <input value={newName} onChange={handleNameChange} /><br/>
            Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
        )
    }
    export default PersonForm