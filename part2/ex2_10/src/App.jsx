import React, { useState } from 'react';

const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <p>
      filter shown with 
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
      />
    </p>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name:
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        Number:
        <input
          type="text"
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, searchTerm }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 };

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook.`);
    } else {
      setPersons([...persons, newPerson]);
      setNewName('');
      setNewNumber('');
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

  return (
    <div>
      <h2>Phonebook</h2>

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

      <Persons persons={persons} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
