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
            minLength={3}
          />
        </div>
        <div>
          Number:
          <input
            type="text"
            value={newNumber}
            onChange={handleNumberChange}
            minLength={8}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    );
  };

export default PersonForm;