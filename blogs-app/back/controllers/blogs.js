const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 , id: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })

  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body.comment
  const blog = await Blog.findById(request.params.id)

  blog.comments.push(comment)

  const savedBlog = await blog.save()

  response.json(savedBlog.toJSON())
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog(body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  blog.user = user.id
  const savedBlog = await (
    await blog.save())

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await Blog
    .findById(savedBlog.id)
    .populate('user', { username: 1, name: 1 })
  response.json(populatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = await Blog.findById(request.params.id)

  if ( blog.user.toString() !== user.id.toString() ) {
    return response.status(401).json({ error: 'only blog link creator can remove it' })
  }
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  const populatedBlog = await Blog
    .findById(updatedBlog.id)
    .populate('user', { username: 1, name: 1 })
  response.json(populatedBlog.toJSON())
})

module.exports = blogsRouter