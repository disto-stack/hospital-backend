const { Router } = require('express')
const { check } = require('express-validator')

const router = Router()

const { searchAll, searchInCollection } = require('../controllers/search')

const { validateJWT } = require('../middlewares/validateJWT')
const { validateFields } = require('../middlewares/validateFields')

router.get('/:searchParam', validateJWT, searchAll)
router.get('/collection/:collectionToSearch/:searchParam', validateJWT, searchInCollection)

module.exports = router