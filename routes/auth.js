const { Router } = require('express')
const { check } = require('express-validator')

const router = Router()

const { login, loginWithGoogle, renewToken } = require('../controllers/auth')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validateJWT')

router.post('/',
    [
        check('email', 'email empty or invalid').notEmpty().isEmail(),
        check('password', 'password empty').notEmpty(),
        validateFields
    ],
    login
)
router.post('/google',
    [
        check('googleToken', 'google token empty').notEmpty(),
        validateFields
    ],
    loginWithGoogle
)
router.post('/renew-token', validateJWT, renewToken)

module.exports = router