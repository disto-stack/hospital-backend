const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('useFindAndModify', false)
const dbConnection = async () => {
    try {
        const mongooseConnectConfig = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        }
        await mongoose.connect(process.env.mongoURLConection, mongooseConnectConfig)

        console.log('Db online')
    } catch (error) {
        console.error('Error', error)
    }


}

module.exports = {
    dbConnection
}
