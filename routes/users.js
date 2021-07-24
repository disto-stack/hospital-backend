const { Router } = require('express')
const { getUsers, createUsers } = require('../controllers/users')

const router = Router()

router.get('/', getUsers) 
router.post('/', createUsers)

module.exports = router