const Notification = ({ message }) => {
    if (message === null){
        return null
    }

    const notificationStyle = {
        border: '2px solid black',
        padding: '8px',
    };

    return (
        <div className='error2' style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification
