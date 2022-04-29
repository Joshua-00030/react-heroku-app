const Persons =(props) =>{
        return props.displayList.map(person => 
            <p key={person.id}>
                {person.name} {person.number} 
                <button value={person.id} onClick={(button) => props.removePerson(button.target.value)}>Remove</button>
            </p>
        )
}

export default Persons