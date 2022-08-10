require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express()
const db = require('./db')

// Import files
const signup = require('./router/signup')
const sigin = require('./router/sigin')

app.use(express.json({extended: true}))
app.use(cors())

// DB
db();

// Files
app.use('/api/signup', signup)
app.use('/api/sigin', sigin)

const port = process.env.PORT || 8080

app.listen(port, () => console.log('listening on port ' + port))

