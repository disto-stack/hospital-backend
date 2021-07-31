const { Router } = require('express')
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users')

const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validateJWT')

const router = Router()

router.get('/', validateJWT, getUsers)

router.post(
    '/', 
    [
        check('name', 'name invalid or empty').notEmpty(),
        check('password', 'password invalid or empty').notEmpty(),
        check('email', 'email invalid or empty').notEmpty().isEmail(),
        validateFields
    ], 
    createUser
)

router.put('/:id',
    [
        validateJWT,
        check('name', 'name invalid or empty').notEmpty(),
        check('role', 'role invalid or empty').notEmpty(),
        check('email', 'email invalid or empty').notEmpty().isEmail(),
        validateFields
    ],
    updateUser
)

router.delete('/:id', validateJWT, deleteUser)

module.exports = router