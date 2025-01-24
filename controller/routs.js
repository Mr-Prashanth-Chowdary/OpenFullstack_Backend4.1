const route = require('express').Router()
const Blog = require('../model/db')
const User = require('../model/User')
const jwt  = require('jsonwebtoken')
const jwtKey = require('../utils/config') 

// helpper function for extracting token -> moved to middleware
// const getTokenData = request =>{
//   const authentication = request.get('authorization')
//     if(authentication && authentication.startsWith('Bearer ')){
//       return authentication.replace('Bearer ','')
//     }
//   return null
// }

route.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
route.post('/', async(request, response,next) => {

  const {title,author,url,likes} = request.body
  const owner = request.user
  if(!owner){
    return response.status(401).json({error:'token invalid'})
  }
  const user = await User.findById(request.id)
  if(!title || !author || !url){
    return response.status(400).end()
  }

  try{
  const blog = new Blog({title,author,url,likes:likes !== undefined ? likes : 0, users:user.id})
  const dbRes = await blog.save()
  user.blogs = user.blogs.concat(dbRes.id)
  await user.save()
  response.status(201).json(dbRes)
  }catch(e){
    next(e)
  }
})

route.delete('/:id',async(request,response,next)=>{
  try{
  const {id} = request.params
  const user = await User.findById(request.id)
  const userblogId = user.blogs.find((blogId)=>blogId.toString() === id)
  if(!userblogId){
    return response.status(401).json({error:'unauthorized access'})
  }
  const dbRes = await Blog.findByIdAndDelete(id)
  response.status(200).json({message:'blog deleted',blog: dbRes})
}catch(e){
  next(e)
}
})

route.put('/:id',async(request,response)=>{
  const {id} = request.params
  const {likes,...rest} = request.body
  const dbRes = await Blog.findByIdAndUpdate(id,{likes, ...rest},{new:true})
  response.status(200).json({message:'blog updated',blog:dbRes})
})

module.exports = route
