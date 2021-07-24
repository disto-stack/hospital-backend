const { Router } = require('express')
const { getUsers, createUsers } = require('../controllers/users')

const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields')

const router = Router()

router.get('/', getUsers) 
router.post(
    '/', 
    [
        check('name', 'name is empty').notEmpty(),
        check('password', 'password invalid or empty').notEmpty(),
        check('email', 'email invalid or empty').notEmpty().isEmail(),
        validateFields
    ], 
    createUsers)

module.exports = router