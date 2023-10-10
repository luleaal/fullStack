import React, { useState, useEffect } from 'react';
import phonebookService from './services/phonebook'; 
import axios from 'axios';
import './App.css'; 
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import DeleteNotification from './components/DeleteNotification';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null); 

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
  
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const confirmed = window.confirm(
        `${newName} is already in the phonebook. Do you want to update their number?`
      );
  
      if (confirmed) {
        axios
          .put(`http://localhost:3001/api/persons/${existingPerson.id}`, newPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response.data : person
              )
            );
            setNewName('');
            setNewNumber('');
            showNotification(`Updated ${newName}'s number`);
          })
          .catch((error) => {
            console.error("Error updating person:", error);
          });
      }
    } else {
      axios
        .post('http://localhost:3001/api/persons', newPerson)
        .then((response) => {
          setPersons([...persons, response.data]);
          setNewName('');
          setNewNumber('');
          showNotification(`Added ${newName}`);
        })
        .catch((error) => {
          console.error("Error adding new person:", error);
        });
    }
  };
  
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
  
    if (!personToDelete) {
      return;
    }
  
    const confirmed = window.confirm(`Delete ${personToDelete.name}?`);
  
    if (confirmed) {
      phonebookService.eliminate(id).then(() => {
        const updatedPersons = [];
        for (const person of persons) {
          if (person.id !== id) {
            updatedPersons.push(person);
          }
        }
        setPersons(updatedPersons);
  
        // Set the delete message
        setDeleteMessage(`Deleted ${personToDelete.name}`);
        setTimeout(() => {
          setDeleteMessage(null); // Clear the delete message
        }, 3000);
      });
    }
  };
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <DeleteNotification message={deleteMessage} />
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />

      <h3>add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} searchTerm={searchTerm} onDelete={handleDelete}/>
    </div>
  );
};

export default App;
