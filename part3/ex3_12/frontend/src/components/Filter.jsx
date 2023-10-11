import React from 'react';

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

export default Filter;
