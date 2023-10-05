import React from 'react';

const Persons = ({ persons, searchTerm, onDelete }) => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => onDelete(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };

export default Persons;