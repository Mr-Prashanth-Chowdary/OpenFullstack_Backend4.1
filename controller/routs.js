const route = require('express').Router()
const Blog = require('../model/db')

route.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
route.post('/', async(request, response) => {
  const {title,author,url,likes} = request.body
  if(!title || !author || !url){
    return response.status(400).end()
  }

  const blog = new Blog({title,author,url,likes:likes !== undefined ? likes : 0 })
  const dbRes = await blog.save()
  response.status(201).json(dbRes)
})

route.delete('/:id',async(request,response)=>{
  const {id} = request.params
  const dbRes = await Blog.findByIdAndDelete(id)
  response.status(200).json({message:'blog deleted',blog: dbRes})
})

route.put('/:id',async(request,response)=>{
  const {id} = request.params
  const {likes,...rest} = request.body
  const dbRes = await Blog.findByIdAndUpdate(id,{likes, ...rest},{new:true})
  response.status(200).json({message:'blog updated',blog:dbRes})
})

module.exports = route
