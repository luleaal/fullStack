import React from 'react';

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

export default PersonForm;