import personService from '../services/persons'

const Filter = ({filterBy, handleFilter}) =>
    <input value={filterBy} onChange={handleFilter}/>

const PersonForm = ({ addPerson, newName, handleNewName, newNumber, handleNewNumber }) => {
    return <form onSubmit={ addPerson }>
    <div>name: 
        <input 
        value={ newName }
        placeholder='Enter new name'
        onChange={ handleNewName }
        />
    </div>
    <div>number: 
        <input
        value={newNumber}
        placeholder='Enter new number'
        onChange={handleNewNumber} 
        />
    </div>
    <div>
        <button type="submit">add</button>
    </div>
    </form>
}

const Contacts = ({peopleToShow}) => {
    //At the current stage, refreshing of the webpage is needed to show changes after deletion
    const handleClick = (id, name) => {
        console.log("Delete button clicked")
        if (window.confirm(`Delete ${name}?`)) {
            personService.remove(id)
        }
    }

    return peopleToShow.map(person => 
        <div key={person.id}>
            {person.name} {person.number}  
            <button onClick={() => handleClick(person.id, person.name)}>delete</button>
        </div>
    )
}
    
export {Filter, PersonForm, Contacts,}