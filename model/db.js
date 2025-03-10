const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  users:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

blogSchema.set('toJSON',{
  transform:(obj,returnObj)=>{
    returnObj.id = returnObj._id.toString()
    delete returnObj._id
    delete returnObj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)