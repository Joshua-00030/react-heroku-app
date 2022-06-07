const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.post('', async (request, response, next) => {
  const body = request.body
try{

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
}catch(error){
  next(error)
}
})

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/api/info', async (req, res) => {
  const blogLength = await Blog.find({}).length
  res.send(`Phonebook has info for ${blogLength} people <br/> ${new Date}`)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  })

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      _id: body.id
    }

  Blog.findByIdAndUpdate(blog._id, blog,
    { new: true, runValidators: true, context: 'query' })
    .then(updatedBlog =>{
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter