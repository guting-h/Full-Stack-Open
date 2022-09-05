import { useState, useEffect } from 'react'
import { Filter, PersonForm, Contacts, Notification } from './components/subcomponents'
import personService from './services/persons'

let notificationStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const notify = ( message ) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const resetFields = () => {
    setNewName('')
    setNewNumber('')
  }

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
            notificationStyle = {...notificationStyle, color: 'green'}
            notify(`Updated ${newName}'s number`)
            resetFields()
          })
          .catch(error => {
            notificationStyle = {...notificationStyle, color: 'red'}
            notify(`Information of ${newName} has already been removed from server`)
            setPersons(persons.filter(n => n.id !== oldContact.id))
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
          notificationStyle = {...notificationStyle, color: 'green'}
          notify(`Added ${newName}`)
          resetFields()
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
      <h1>Phonebook</h1>
      <Notification message={message} notificationStyle={notificationStyle}/>
       filter by name: 
      <Filter filterBy={filterBy} handleFilter={handleFilter}/>
      <h2>Add a new contact</h2>
      <PersonForm 
        newName={newName} 
        addPerson={addPerson} 
        handleNewName={handleNewName} 
        newNumber={newNumber} 
        handleNewNumber={handleNewNumber} 
      />
      <h2>Numbers</h2>
      <Contacts 
        peopleToShow={peopleToShow()} 
        setMessage={setMessage}
        notify={notify}
        notificationStyle={notificationStyle}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App
