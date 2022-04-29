const Filter =({countries, setDisplayList, filter, setFilter}) =>{

  const handleFilterChange = (event) => {
    console.log(countries[0].cca2)
    setFilter(event.target.value)
    if([...countries].filter(person => person.name.common.toLowerCase().includes(event.target.value.toLowerCase())).length > 10){
      
    }
    setDisplayList([...countries].filter(person => person.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

    return(
      <form>
      <div>
        Find Countries: <input value={filter} onChange={handleFilterChange} />
      </div>
    </form>
    )
}
export default Filter