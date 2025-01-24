const auth = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const jwtKey = require('../utils/config')

auth.post('/login',async(request,response)=>{
    const {username, password} = request.body
    const user = await User.findOne({username})
    const passwordCorrect = user === null ? false : await bcrypt.compare(password,user.password)
    if(!(user && passwordCorrect)){
        return response.status('404').json({error:'Invalid username or password'})
    }

    const userForToken = {
        username: user.name,
        id: user._id
    }

    const token = jwt.sign(userForToken, jwtKey.SECRET)
    
    return response.status(200).json({token,username:user.username,name:user.name})
})

module.exports = auth
