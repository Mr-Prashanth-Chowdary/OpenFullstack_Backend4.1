
const getToken = (request,response,next)=>{
    const authentication = request.get('authorization')
    if(authentication && authentication.startsWith('Bearer ')){
        const token = authentication.replace('Bearer ','')
        request.token = token
    }
    next()
}

module.exports = {getToken}