import personService from '../services/persons'

const Filter = ({ filterBy, handleFilter }) =>
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
        value={ newNumber }
        placeholder='Enter new number'
        onChange={ handleNewNumber } 
        />
    </div>
    <div>
        <button type="submit">add</button>
    </div>
    </form>
}

const Contacts = ({ peopleToShow, notify, notificationStyle, persons, setPersons }) => {
    //If a delete action is performed soon after the name is deleted in another browser
    //The page won't crash and deletion will be "successful", but the console will report errors
    const handleClick = (id, name) => {
        console.log("Delete button clicked")
        if (window.confirm(`Delete ${name}?`)) {
            personService.remove(id)
            notificationStyle = {...notificationStyle, color: 'green'}
            notify(`Deleted ${name}`)
            setPersons(persons.filter(n => n.id !== id)) //notify and updated the pagee
        }
    }

    return peopleToShow.map(person => 
        <div key={person.id}>
            {person.name} {person.number}  
            <button onClick={() => handleClick(person.id, person.name)}>delete</button>
        </div>
    )
}

const Notification = ({ message, notificationStyle }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div style={notificationStyle} >
        {message}
      </div>
    )
}
    
export { Filter, PersonForm, Contacts, Notification }