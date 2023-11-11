import Togglable from './Togglable'

const Blog = ({ blog, handleLikes, onDeleteBlog, username }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const urlStyle = {
    color: 'purple'
  }

  const removeStyle = {
    color: 'white',
    backgroundColor: 'blue'
  }

  const likeStyle = {
    color: 'white',
    backgroundColor: 'green'
  }

  const handleOnDeleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      onDeleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle} className='blog' id='blog'>
      <b>{blog.title} </b> by: {blog.author}
      <Togglable buttonLabel = 'view'>
        <u><p className='url' style={urlStyle}>{blog.url}</p></u>
        <p className='likes' id='likes'>
          Likes: {blog.likes}
          <button id='likeButton' style={likeStyle} onClick={() => handleLikes(blog.id)}>Like</button>
        </p>
        {username === (blog.user.username) ?
          <button style={removeStyle} onClick={handleOnDeleteBlog}>Remove</button> :
          null}
      </Togglable>
    </div>
  )
}

export default Blog