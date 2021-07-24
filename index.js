require ('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')

const { dbConnection } = require('./database/config')
dbConnection()

app.use(cors())

// Routes
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hello world'
    })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log('Server running on port:', port)
})