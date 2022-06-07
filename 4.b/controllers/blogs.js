const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = token === null
  ? false
  : jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
//typically would be caught through the async but the mongoose authentication was failing/interrupting the cath
  try{
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }catch(error){
    next(error)
  }
})

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/api/info', async (req, res) => {
  const blogLength = await Blog.find({}).length
  res.send(`Phonebook has info for ${blogLength} people <br/> ${new Date}`)
})

blogsRouter.delete('/:id', async (request, response) => {
  
  const token = getTokenFrom(request)
  const decodedToken = token === null
  ? false
  : jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const selectedBlog = await Blog.findById(request.params.id)
  
  if(user._id.equals(selectedBlog.user)){ 
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    response.status(400).json({error: 'only the creator of the blog may delete it.'})
  }
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