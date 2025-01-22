const {test,describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy return one',()=>{
    const blog = []
    const reslut = listHelper.dummy(blog)
    assert.strictEqual(reslut,1)
})

describe('total likes count',()=>{
    const listOfBlogs = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
         __v: 0
        },
        {
        _id: "678e18e689dff40b9bc16383",
        title: "A girl in room no.105",
        author: "Chaithan bhagath",
        url: "http://A gitl in room no.105.com",
        likes: 70,
        __v: 0
        }
    ]
    test("the total count of blogs from the list is",()=>{
        const reslut = listHelper.totalLikes(listOfBlogs)
        assert.strictEqual(reslut,75)
    })
})

describe("useing deepStrictEqual for checking objects returning max count likes object",()=>{
    const objs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
             __v: 0
            },
            {
            _id: "678e18e689dff40b9bc16383",
            title: "A girl in room no.105",
            author: "Chaithan bhagath",
            url: "http://A gitl in room no.105.com",
            likes: 70,
            __v: 0
            }
    ]
    test("reutrn the max likes count obj",()=>{
        const reslut = listHelper.maxLikes(objs)
        assert.deepStrictEqual(reslut,{title: "A girl in room no.105",author: "Chaithan bhagath",likes: 70})
    })
})