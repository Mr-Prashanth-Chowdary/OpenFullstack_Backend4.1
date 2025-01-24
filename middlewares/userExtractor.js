const jwt = require('jsonwebtoken')
const jwtkey = require('../utils/config')
const getUser = (request,response,next)=>{
    try{
    const decodetoken = jwt.verify(request.token,jwtkey.SECRET)
    request.user = decodetoken.username
    request.id  = decodetoken.id
    }catch(e){
        next(e)
    }
    next()
}
module.exports = {getUser}