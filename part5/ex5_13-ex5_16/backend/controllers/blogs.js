const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('bearer ')) {
    return authorization.replace('bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.blog.likes){
    body.blog.likes = 0
  }

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = request.user;
  
  const blog = new Blog({
    title: body.blog.title,
    author: body.blog.author,
    url: body.blog.url,
    likes: body.blog.likes,
    user: user._id})

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})


blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})


blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' });
  }

  const blogToDelete = await Blog.findById(request.params.id);

  if (!blogToDelete) {
    return response.status(401).json({ error: 'Invalid blog id' })
  }

  const user = request.user;

  if (blogToDelete.user.toString() != user.id) {
    return response.status(401).json({ error: 'Unauthorized user' });
  }

  await Blog.findByIdAndRemove(request.params.id)
  return response.status(204).end()

})


blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  
  const existingBlog = await Blog.findById(request.params.id);

  if (!existingBlog) {
    return response.status(400).json({ error: 'Blog not found' });
  }

  existingBlog.likes = body.likes;

  const updatedBlog = await existingBlog.save();
  response.json(updatedBlog);
});


module.exports = blogsRouter