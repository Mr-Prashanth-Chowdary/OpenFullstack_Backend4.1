const {test, beforeEach, after,describe} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const User = require('../model/User')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')


beforeEach(async()=>{
   await User.deleteMany({})
})
describe('user tests',()=>{
    test('check the post method to insert a user',async()=>{
        const response = await api.get('/api/users').expect(200)
        assert.strictEqual(response.body.length,0)
    })
    test('check the validation on duplicate data insertion',async()=>{
        const data = {
            username:"prashanth",
            password:"123123",
            name:"prashanth"
        }
        await api.post('/api/users').send(data)
        const res  =await api.post('/api/users').send(data).expect(400)
        
    })
    test('validation on missing username',async()=>{
        const data={
            username:"",
            password:"123123",
            name:"hello"
        }
        const res = await api.post('/api/users').send(data).expect(400)
        assert.strictEqual(res.body.error,"filed values missing")
    })
    test('validation on missing password',async()=>{
        const data = {
            username:"new",
            password:"",
            name:"hello"
        }
        const res = await api.post('/api/users').send(data).expect(400)
        assert.strictEqual(res.body.error,"filed values missing")
    })
    test('validation on weak password',async()=>{
        const data={
            username:"new",
            password:"12",
            name:"hello"
        }
        const res = await api.post('/api/users').send(data).expect(400)
        assert.strictEqual(res.body.error,"weak password! should be atlest 3 char long")
    })
})


after(async()=> await mongoose.connection.close())