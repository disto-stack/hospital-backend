const jwt = require('jsonwebtoken')

const generateJWT = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }
        
        jwt.sign(payload, process.env.JWTSecretKey, {
            expiresIn: '24h'
        }, (error, token) => {
            if (error) {
                console.error(error)
                reject('Error in jwt generation')
            }

            resolve(token)
             
        })
    }) 
}

module.exports = {
    generateJWT
}