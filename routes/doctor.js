const { Router } = require('express')

const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctor')

const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validateJWT')

const router = Router()

router.get('/', validateJWT, getDoctors)

router.post(
    '/', 
    [], 
    createDoctor
)

router.put('/:id',
    [],
    updateDoctor
)

router.delete('/:id', validateJWT, deleteDoctor)

module.exports = router