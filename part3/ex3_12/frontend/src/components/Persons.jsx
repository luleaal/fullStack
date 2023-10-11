import React from 'react';

const Persons = ({ persons, searchTerm, onDelete }) => {
  if (!persons.length) return null // You can change null for some text explaining the user what is going on  

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