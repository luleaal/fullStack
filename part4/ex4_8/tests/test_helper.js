const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: 'Sample blog',
      author: 'James Doe',
      url: 'http://sampleblog.com',
      likes: 10,
    },
    {
      title: 'Sample blog Part 2',
      author: 'James Doe',
      url: 'http://sampleblog2.com',
      likes: 8,
    },
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'James', url: "http://a.com", likes: 1 })
    await blog.save()
    await blog.deleteOne()
  
    return blog._id.toString()
  }
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialNotes, nonExistingId, blogsInDb
}