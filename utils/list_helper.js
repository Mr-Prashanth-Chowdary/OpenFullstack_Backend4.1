const dummy = (blogs)=>{
    return 1
}
const totalLikes = (blogs)=>{
    return blogs.reduce((acc,blog)=>  blog.likes+acc,0)
}
const maxLikes = (blogs)=>{
    const maxCountLikes = Math.max(...blogs.map((obj)=>obj.likes))
    const nb =  blogs.find((blog)=>blog.likes === maxCountLikes)
    return {
        title:nb.title,
        author:nb.author,
        likes:nb.likes
    }
}

module.exports = {dummy,totalLikes,maxLikes}
