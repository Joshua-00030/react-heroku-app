const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have content returned in blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(titles).toContain('Go To Statement Considered Harmful')
})

test('blog without content is not added', async () => {
  const newBlog = {
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAfter = await helper.blogsInDb()
  expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
})

test('blog with content is added', async () => {
  const newBlog = {
    title: 'Testing title',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubl',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsAfter = await helper.blogsInDb()
  expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
})

  test('blog with no likes defaults to 0 likes', async () => {
    const newBlog = {
      title: 'Testing title',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubl',
      likes: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
  
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter[2].likes).toEqual(0)
  })

  test('expect id to be defined as id', async () =>{
    console.log(helper.initialBlogs[0])
    expect(helper.initialBlogs[0].id).toBeDefined()
  })

  test('blog with no title is not added & gets 400 error', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubl',
      likes: 2
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
  })

  test('blog with no url is not added & gets 400 error', async () => {
    const newBlog = {
      title: 'Testing title',
      author: 'Edsger W. Dijkstra',
      likes: 2
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
  })

  test('blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1)
  })

  test('blogs titles can be edited', async () => {
    const blogList = await helper.blogsInDb()
    const blogToUpdate = blogList[0]
    blogToUpdate.title = 'Go To Statement Not Actually Considered Safe'
    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0]).toEqual(blogToUpdate)
  })

afterAll(() => {
  mongoose.connection.close()
})