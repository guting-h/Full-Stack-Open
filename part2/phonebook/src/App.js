import { useState, useEffect } from 'react'
import { Filter, PersonForm, Contacts } from './components/subcomponents'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
     
    if (names.includes(newName.trim())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const oldContact = persons.find(person => person.name === newName.trim())
        const updated = { ...oldContact, number: newNumber}
        personService
          .update(oldContact.id, updated)
          .then(response => {
            setPersons(persons.map(person => person.id !== oldContact.id ? person : response.data))
            setNewName('')
            setNewNumber('')
          })
      } 
    } else {
      const personObject = {
        name: newName.trim(),
        number: newNumber,
        id: "id" + Math.random().toString(16).slice(2), // generates a random id s.t. deleting then adding persons in a random order 
                                                        // won't cause an error due to duplicate id
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
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
