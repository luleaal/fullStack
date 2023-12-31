const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => { 
    const blogs = await Blog.find({})
    response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
    if (!request.body.likes){
        request.body.likes = 0
    }

    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
      const blog = await Blog.findById(request.params.id)
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    } catch(exception) {
      next(exception)
    }
})
  
blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch(exception) {
        next(exception)
    }
})

module.exports = blogsRouter