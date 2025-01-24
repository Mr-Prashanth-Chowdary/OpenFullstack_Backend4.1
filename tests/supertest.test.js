const {test,after,beforeEach} = require('node:test')
const mongoose = require('mongoose')
const db = require('../model/db')
const app = require('../app')
const supertest = require('supertest')
const assert = require('node:assert')
const api = supertest(app)



// dummy data
const helper = require('./test_helper')

//dummy token
mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imtpc3MiLCJpZCI6IjY3OTM2YjFjYzM0NGYwYTBjYzRkOGFmMCIsImlhdCI6MTczNzcxNDY4N30.F5W9bVotAF2gpyJ-FveHUrrpIZSp0WIue732EP8wKK0"

beforeEach(async()=>{
    await db.deleteMany({})
    let newObj = {
        title:'it delete demo',
        author:'coolen hover',
        url:'http://itsendswithus.com',
        likes : 7
    }
    const dbres = await api.post('/api/blogs').set('Authorization',`Bearer ${mockToken}`).send(newObj).expect(201)
})

test('notes are returnd as json',async()=>{
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type',/application\/json/)
})
test('the lenght of the body',async()=>{
    const data = await api.get('/api/blogs')
    assert.strictEqual(data.body.length,1)
})
test('check the id',async()=>{
    const data = await api.get('/api/blogs')
    data.body.forEach(blog=>{
        assert(blog.hasOwnProperty('id'),`id missing for ${blog}`)
    })
})
test('post method to save a data',async()=>{
    let newObj = {
        title:'it ends with us',
        author:'coolen hover',
        url:'http://itsendswithus.com',
        likes : 7
    }
    const prevRes = await api.get('/api/blogs')
    const postReq = await api.post('/api/blogs').set('Authorization',`Bearer ${mockToken}`).send(newObj).expect(201)
    const postRes = await api.get('/api/blogs')
    assert.strictEqual(prevRes.body.length,postRes.body.length-1)
})
test('check likes to be 0 if it is undefind',async()=>{
    const newObj = {
        title:'it stats with us',
        author:'coolen hover',
        url:'http://itstatswithus'
    }
    const postReq = await api.post('/api/blogs').set('Authorization',`Bearer ${mockToken}`).send(newObj).expect(201)
    assert.strictEqual(postReq.body.likes, 0)
})
test('check the 400 res for missing url and title', async()=>{
    const newObj = {
        author : 'prashanth'
    }
    const postReq = await api.post('/api/blogs').set('Authorization',`Bearer ${mockToken}`).send(newObj).expect(400)
})
test('update route check',async()=>{
    const data = await api.get('/api/blogs')
    const {...rest} = data.body[0]
    const updateData = {like:10,...rest}
    const update = await api.put(`/api/blogs/${data.body[0].id}`,updateData).set('Authorization',`Bearer ${mockToken}`).expect(200)
})
test('delete route test for deleting the route',async()=>{
    const data = await api.get('/api/blogs')
    console.log(data)
    const ondelete = await api.delete(`/api/blogs/${data.body[0].id}`).set('Authorization',`Bearer ${mockToken}`).expect(200)
})
after(async()=>{
    await mongoose.connection.close()
})