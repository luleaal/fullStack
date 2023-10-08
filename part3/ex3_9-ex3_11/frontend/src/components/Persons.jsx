import React from 'react';

const Persons = ({ persons, searchTerm, onDelete }) => {
    const filteredPersons = [];
    
    for (const person of persons) {
      if (person.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        filteredPersons.push(person);
      }
    }
  
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