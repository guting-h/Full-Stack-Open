import { useState, useEffect } from 'react'
import axios from 'axios'
import {Filter, PersonForm, Contacts} from './components/subcomponents'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
