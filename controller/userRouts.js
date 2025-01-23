const userRoute = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')

userRoute.post('/',async(request,response)=>{
    const {username, password, name} = request.body
    if(!username || !password || !name){
        return response.status(400).json({error:'filed values missing'})
    }
    if(password.length<3){
        return response.status(400).json({error:'weak password! should be atlest 3 char long'})
    }
    const saltRounds = 10
    const passwordhash = await bcrypt.hash(password,saltRounds)

    const newUser = new User({
        username:username,
        name:name,
        password:passwordhash
    })
    try{
    const dbres = await newUser.save()
    response.status(200).json({message:'user saved',dbres})
    }catch(e){
        
    }
})

module.exports = userRoute