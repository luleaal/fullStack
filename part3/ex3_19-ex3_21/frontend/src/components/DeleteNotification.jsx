import React from 'react';

const DeleteNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='deleteMessage'>
        {message}
      </div>
    )
  };

export default DeleteNotification;