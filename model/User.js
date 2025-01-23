const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        minlength: 3,
        unique: true
    },
    name : String,
    password: {
        type:String,
        required: true,
    },
    blogs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON',{
    transform:(doc,returnDoc)=>{
        returnDoc.id = returnDoc._id
        delete returnDoc._id
        delete returnDoc.__v
        delete returnDoc.password
    }
})

module.exports = mongoose.model('User',userSchema)