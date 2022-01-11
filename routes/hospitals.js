const { Router } = require('express')

const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals')

const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validateJWT')

const router = Router()

router.get('/', validateJWT, getHospitals)

router.post(
    '/', 
    [], 
    createHospital
)

router.put('/:id',
    [],
    updateHospital
)

router.delete('/:id', validateJWT, deleteHospital)

module.exports = router