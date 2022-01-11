const { Router } = require('express')

const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital')

const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validateJWT')

const router = Router()

router.get('/', validateJWT, getHospitals)

router.post(
    '/', 
    [
        validateJWT,
        check('name', 'hospital name empty or invalid').notEmpty(),
        validateFields
    ], 
    createHospital
)

router.put('/:id',
    [],
    updateHospital
)

router.delete('/:id', validateJWT, deleteHospital)

module.exports = router