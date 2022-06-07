import React from 'react'
import styled from 'styled-components'

const Persons = (props) => {
   const StyledDiv = styled.div`
        background: lightgrey;
        padding-bottom: 1em;
        margin:auto;
        margin-top:1em;
        width:90%;
        border:black solid 2px;
        border-radius: 2%;
        padding-left: 1em;
        padding-right: 1em;
        @media (min-width: 768px) {
         margin-left:0;
         width: ${props => props.width || "40%"};
        }
    `;
    

   const genNumbers = (props) => {
      return props.displayList.map(person =>
         <p key={person.id}>
            {person.name}: {person.phoneNumber}
            <button value={person.id} onClick={(button) => props.removePerson(button.target.value)}>Remove</button>
         </p>
      )
   }
   return (
      <StyledDiv>
         <h2>Numbers</h2>
         {genNumbers(props)}
      </StyledDiv>

   )

}

export default Persons