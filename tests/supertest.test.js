const {test,after,beforeEach} = require('node:test')
const mongoose = require('mongoose')
const db = require('../model/db')
const app = require('../app')
const supertest = require('supertest')
const assert = require('node:assert')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async()=>{
    await db.deleteMany({})
    await db.insertMany(helper)
})

test('notes are returnd as json',async()=>{
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type',/application\/json/)
})
test('the lenght of the body',async()=>{
    const data = await api.get('/api/blogs')
    assert.strictEqual(data.body.length,4)
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
    const postReq = await api.post('/api/blogs').send(newObj).expect(201)
    const postRes = await api.get('/api/blogs')
    assert.strictEqual(prevRes.body.length,postRes.body.length-1)
})
test('check likes to be 0 if it is undefind',async()=>{
    const newObj = {
        title:'it stats with us',
        author:'coolen hover',
        url:'http://itstatswithus'
    }
    const postReq = await api.post('/api/blogs').send(newObj).expect(201)
    assert.strictEqual(postReq.body.likes, 0)
})
test('check the 400 res for missing url and title', async()=>{
    const newObj = {
        author : 'prashanth'
    }
    const postReq = await api.post('/api/blogs').send(newObj).expect(400)
})
test('update route check',async()=>{
    const data = await api.get('/api/blogs')
    const {...rest} = data.body[0]
    const updateData = {like:10,...rest}
    const update = await api.put(`/api/blogs/${data.body[0].id}`,updateData).expect(200)
})
test('delete route test for deleting the route',async()=>{
    const data = await api.get('/api/blogs')
    const ondelete = await api.delete(`/api/blogs/${data.body[0].id}`).expect(200)
})
after(async()=>{
    await mongoose.connection.close()
})