import React, { useState } from "react"

const Filter =({persons, setDisplayList}) =>{
    
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setDisplayList([...persons].filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

    return(
      <form>
      <div>
        Filter shown with: <input value={filter} onChange={handleFilterChange} />
      </div>
    </form>
    )
}
export default Filter