const { Router } = require('express')

const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctor')

const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validateJWT')

const router = Router()

router.get('/', validateJWT, getDoctors)

router.post(
    '/', 
    [
        validateJWT,
        check('name', 'doctor name empty or invalid').notEmpty(),
        check('hospital', 'hospital empty or invalid').isMongoId(),
        validateFields
    ], 
    createDoctor
)

router.put('/:id',
    [
        validateJWT,
        check('name', 'doctor name empty or invalid').notEmpty(),
        check('hospital', 'hospital empty or invalid').isMongoId(),
        validateFields
    ],
    updateDoctor
)

router.delete('/:id', validateJWT, deleteDoctor)

module.exports = router