const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })
  
test('the first blog is about Sample', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('Sample blog')
})

afterAll(async () => {
  await mongoose.connection.close()
})
