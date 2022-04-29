import React, { useState } from "react"

const PersonForm =({persons, addPerson, updateNumber}) =>{
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
  
    const tryAddPerson =(event) => {
      event.preventDefault()
      const nameCheck = persons.find(a => a.name === newName)
      if (nameCheck!== undefined){
        if(window.confirm(`${newName} is already in the phone book. Replace number with ${newNumber}`))
        {
          const changedPerson = {...nameCheck, number: newNumber}
          updateNumber(changedPerson)
        }
      }
      else{
        addPerson(event)
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
        <form onSubmit={tryAddPerson}>
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