const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./controller/routs')
const mongoose = require('mongoose')
require('dotenv').config()
const logger = require('./utils/logger')
const config = require('./utils/config')

// database connection
const mongoUrl = config.MONGO_URI
mongoose.connect(mongoUrl).then(()=>logger.info('db connected')).catch((error)=>logger.error(error))

app.use(cors())
app.use(express.json())

app.use('/api/blogs',routes)

module.exports = app