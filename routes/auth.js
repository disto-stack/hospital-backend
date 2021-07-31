const { Router } = require('express')
const { check } = require('express-validator')

const router = Router()

const { login } = require('../controllers/auth')
const { validateFields } = require('../middlewares/validateFields')

router.post('/',
    [
        check('email', 'email empty or invalid').notEmpty().isEmail(),
        check('password', 'password empty').notEmpty(),
        validateFields
    ],
    login
)

module.exports = router