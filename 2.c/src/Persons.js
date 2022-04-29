import ShowWeather from "./weather"

const Persons =({displayList, handleFilterChange}) =>{

    if(displayList.length > 10)
    return <p>Too many matches</p>
    else if(displayList.length === 1){
        return(
            <div>
                <h2>{displayList[0].name.common}</h2>
                <p>Capital: {displayList[0].capital[0]}</p>
                <p>Area: {displayList[0].area}</p>
                <h3>Languages</h3>
                <ul>
                {Object.keys(displayList[0].languages).map(lang => 
                <li key ={lang}>{displayList[0].languages[lang]}</li>
                )}
                </ul>
                <p>{displayList[0].flag}</p>
                <ShowWeather country={displayList[0]}/>
            </div>
        )
    }
    return(
        displayList.map(country => 
        <li key={country.name.common}>{country.name.common}
            <button type="submit" value={country.name.common} onClick={(e) => handleFilterChange(e)}>show</button>
        </li>
        )
    )
}

export default Persons