import Togglable from './Togglable'

const Blog = ({ blog }) => {

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

  return (
    <div style={blogStyle}>
      <b>{blog.title} </b> by: {blog.author}
      <Togglable buttonLabel = 'view'>
        <u><p className='url' style={urlStyle}>{blog.url}</p></u>
        <p className='likes'>Likes: {blog.likes} <button>Like</button></p> 
      </Togglable>
    </div> 
  )
}

export default Blog