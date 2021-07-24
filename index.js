require ('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')

const { dbConnection } = require('./database/config')
dbConnection()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', require('./routes/users'))

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log('Server running on port:', port)
})