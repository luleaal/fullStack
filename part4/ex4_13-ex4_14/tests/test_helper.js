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

const incompleteBlogs = [
  {
      author: 'Alberto Gimeno',
      url: 'https://blog.logrocket.com/jest-testing-top-features/',
      likes: 1
  },
  {
      title: 'Jest testing: Top features and how to use them',
      author: 'Alberto Gimeno',
      likes: 1
  }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'James', url: "http://a.com", likes: 1 })
    await blog.save()
    await blog.deleteOne()
  
    return blog.id.toString()
  }
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, incompleteBlogs, nonExistingId, blogsInDb
}