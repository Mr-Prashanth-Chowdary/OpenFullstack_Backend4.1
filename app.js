const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./controller/routs')
const mongoose = require('mongoose')
require('dotenv').config()
const logger = require('./utils/logger')
const usersRouter = require('./controller/userRouts')
const config = require('./utils/config')
const errorHandler = require('./utils/ErrorHandelar')
const auth = require('./controller/authentication')
const JsonTX = require('./middlewares/jsonTokenExtractor')
const userX = require('./middlewares/userExtractor')
// database connection
const mongoUrl = config.MONGO_URI
mongoose.connect(mongoUrl).then(()=>logger.info('db connected')).catch((error)=>logger.error(error))

app.use(cors())
app.use(express.json())
app.use('/api/auth',auth)
// app.use(JsonTX.getToken) - > moving to router spacific middleware
app.use('/api/blogs',routes)
app.use('/api/users',usersRouter)
app.use(errorHandler)

module.exports = app