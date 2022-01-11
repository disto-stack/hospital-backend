require ('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')

const { dbConnection } = require('./database/config')
dbConnection()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/user', require('./routes/user'))
app.use('/api/login', require('./routes/auth'))
app.use('/api/hospital', require('./routes/hospital'))
app.use('/api/doctor', require('./routes/doctor'))

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log('Server running on port:', port)
})