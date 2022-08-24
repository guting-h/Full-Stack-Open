import { useState } from 'react'
import {Filter, PersonForm, Contacts} from './components/subcomponents'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName.trim())) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName.trim(),
        number: newNumber,
        id: persons.length +1,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleFilter = (event) => setFilter(event.target.value)

  const handleNewName = (event) => setNewName(event.target.value)

  const handleNewNumber = (event) => setNewNumber(event.target.value)

  const peopleToShow = () => 
    persons.filter(p => p.name.toLowerCase().includes(filterBy.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
       filter by name: 
      <Filter filterBy={filterBy} handleFilter={handleFilter}/>
      <h3>Add a new contact</h3>
      <PersonForm 
        newName={newName} 
        addPerson={addPerson} 
        handleNewName={handleNewName} 
        newNumber={newNumber} 
        handleNewNumber={handleNewNumber} 
      />
      <h2>Numbers</h2>
      <Contacts peopleToShow={peopleToShow()}/>
    </div>
  )
}

export default App
