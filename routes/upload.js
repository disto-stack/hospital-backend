const { Router } = require('express')
const fileUpload = require('express-fileupload');

const router = Router()

const { uploadFile, getFile } = require('../controllers/upload')

const { validateJWT } = require('../middlewares/validateJWT')

router.use(fileUpload())

router.put('/:collection/:objectId', validateJWT, uploadFile)
router.get('/:collection/:fileName', validateJWT, getFile)


module.exports = router