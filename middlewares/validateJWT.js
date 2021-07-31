const jwt = require('jsonwebtoken')

const validateJWT = (req, res, next) => {
    const token = req.header('x-token')
    
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'Empty token in petition'
        })
    }

    try {
        
        const { userId } = jwt.verify(token, process.env.JWTSecretKey)
        req.userId = userId

        next()

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Invalid token'
        })

    }

    
}

module.exports = {
    validateJWT
}