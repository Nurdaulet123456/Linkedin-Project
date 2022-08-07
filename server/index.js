require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express()
const db = require('./db')

// Import files
const signup = require('./router/signup')

app.use(express())
app.use(cors())

// DB
db();

// Files
app.use('/api/signup', signup)

const port = process.env.PORT || 8080

app.listen(port, () => console.log('listening on port ' + port))

