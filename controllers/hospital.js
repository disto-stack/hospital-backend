const Hospital = require('../models/hospital')

const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')

const getHospitals = async (req, res) => {
    const hospitals = await Hospital.find({}, 'name img user')

    return res.json({
        ok: true,
        hospitals
    })
}

const createHospital = async (req, res) => {
    const userId = req.userId
    if (!userId) {
        res.status(500).json({
            ok: false,
            message: 'Not exists user in the request'
        })
    }

    const hospital = new Hospital({
        user: userId,
        ...req.body
    })

    try {
        
        await hospital.save()

        res.json({
            ok: true,
            hospital
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected server error. Try again!'
        })
    }
}

const updateHospital = async (req, res) => {

}

const deleteHospital = async (req, res) => {

}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}
