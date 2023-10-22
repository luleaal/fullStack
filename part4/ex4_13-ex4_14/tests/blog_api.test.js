const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000);

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
});
  
test('the first blog is about Sample', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('Sample blog')
});

test('blog posts have property id instead of _id', async () => {
  const response = await api.get('/api/blogs');
  const blogs = response.body;

  expect(blogs).toHaveLength(2);
  expect(blogs[0]).toHaveProperty('id');
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'John Smith',
    url: "http://newblog.com",
    likes: 9,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

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
      await api
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

  const response = await api.post('/api/blogs').send(newBlog);

  expect(response.status).toBe(201); 
  expect(response.body.likes).toBe(0); 
});

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]


  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body.title).toBe(blogToView.title)
  expect(resultBlog.body.author).toBe(blogToView.author)
  expect(resultBlog.body.url).toBe(blogToView.url)
  expect(resultBlog.body.likes).toBe(blogToView.likes)
});

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]


  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.titles)
});

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: blogToUpdate.likes + 5 })
    .expect(200)

  const updatedBlog = await api.get(`/api/blogs/${blogToUpdate.id}`)

  expect(updatedBlog.body.likes).toBe(blogToUpdate.likes + 5)
});

test('updating number of likes of invalid blog', async () => {
  const validNonExistingId = await helper.nonExistingId()
  console.log(validNonExistingId)

  await api
      .put(`/api/blogs/${validNonExistingId}`)
      .send({ likes: 100 })
      .expect(400)
});

afterAll(async () => {
  await mongoose.connection.close()
});
