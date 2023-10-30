const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')

const api = supertest(app)
const agent = supertest.agent(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const setAuthToken = (token) => {
  agent.set('Authorization', `bearer ${token}`)
}

// beforeEach(async () => {
//   await Blog.deleteMany({})
//   await User.findOneAndDelete({ username: 'user1' })

//   await api 
//   .post('/api/users')
//   .send({
//     username: 'user1',
//     password: 'user1',
//     name: 'User 1'
//   })
//   .expect(201)

//   const response = await api
//   .post('/api/login')
//   .send({
//       username: 'user1',
//       password: 'user1'
//   })

//   setAuthToken(response.body.token)
  
//   let blogObject = new Blog(helper.initialBlogs[0])
//   await blogObject.save()
  
//   blogObject = new Blog(helper.initialBlogs[1])
//   await blogObject.save()
// })

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.findOneAndDelete({ username: 'user1' })

  await api
      .post('/api/users')
      .send({
          username: 'user1',
          password: 'user1',
          name: 'User 1'
      })
      .expect(201)

  const response = await api
      .post('/api/login')
      .send({
          username: 'user1',
          password: 'user1'
      })

  setAuthToken(response.body.token)

  const blogObjects = helper.blogs
      .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await agent
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 10000);

test('there are two blogs', async () => {
    const response = await agent.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
});
  
test('the first blog is about Sample', async () => {
  const response = await agent.get('/api/blogs')

  expect(response.body[0].title).toBe('Sample Blog part 2')
});

test('blog posts have property id instead of _id', async () => {
  const response = await agent.get('/api/blogs');
  const blogs = response.body;

  expect(blogs[0]).toHaveProperty('id');
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'John Smith',
    url: "http://newblog.com",
    likes: 9,
  }

  await agent
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await agent.get('/api/blogs')

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain(
    'New blog'
  )
});


test('creating a blog post without title or url is replied with status code 400', async () => {
  helper.incompleteBlogs.forEach(async blog => {
      await agent
          .post('/api/blogs')
          .send(blog)
          .expect(400)
  })
});

test('blog with missing likes property defaults to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'James Doe',
    url: 'http://example.com/blog',
  };

  const response = await agent.post('/api/blogs').send(newBlog);

  expect(response.status).toBe(201); 
  expect(response.body.likes).toBe(0); 
});

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]


  const resultBlog = await agent
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body.title).toBe(blogToView.title)
  expect(resultBlog.body.author).toBe(blogToView.author)
  expect(resultBlog.body.url).toBe(blogToView.url)
  expect(resultBlog.body.likes).toBe(blogToView.likes)
});

test('a blog cant be deleted without token', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await agent
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(401)

});

test('a blog cant be updated without token', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: blogToUpdate.likes + 5 })
    .expect(401)
});

afterAll(async () => {
  await mongoose.connection.close()
});
