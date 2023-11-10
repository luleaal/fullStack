const Blog = require('../models/blog')
const User = require('../models/user')

const blogs = [
  {
    "title": "Sample Blog part 2",
    "author": "John Doe",
    "url": "https://example.com/sample-blog",
    "likes": 10,
    "id": "653a0bffd4ed358fd0db2768"
  },
  {
    "title": "Sample Blog part 3",
    "author": "John Doe",
    "url": "https://example.com/sample-blog",
    "likes": 0,
    "id": "653a0d02d4ed358fd0db276e"
  }
]

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

const twoValidUsers = [
  {
      username: 'user1',
      name: 'User 1',
      password: 'password1'
  },
  {
      username: 'user2',
      name: 'User 2',
      password: 'password2'
  }
]

const twoInvalidUsers = [
  {
      username: 'us',
      name: 'User 3',
      password: 'password3'
  },
  {
      username: 'user4',
      name: 'User 4',
      password: 'pa'
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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, 
    incompleteBlogs, 
    nonExistingId, 
    blogsInDb,
    usersInDb,
    twoValidUsers,
    twoInvalidUsers,
    blogs
}