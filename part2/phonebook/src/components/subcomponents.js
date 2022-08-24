
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

const Contacts = ({peopleToShow}) => 
    peopleToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)

export {Filter, PersonForm, Contacts,}