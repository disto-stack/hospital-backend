const Hospital = require('../models/hospital')

const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')

const getHospitals = async (req, res) => {
    const hospitals = await Hospital.find({}, 'name img user').populate('user', 'name img')

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

    const { id } = req.params
    const userId = req.userId

    try {

        const foundHospital = Hospital.findById(id)
        if (!foundHospital) {
            req.status(400).json({
                ok: false,
                message: 'Hospital not found. Try with other id'
            })
        }

        const hospitalModified = {
            ...req.body,
            user: userId
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(id, hospitalModified, { new: true })

        res.json({
            ok: true,
            updatedHospital
        })

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected server error. Try again!'
        })
    }

}

const deleteHospital = async (req, res) => {

    const { id } = req.params

    try {

        await Hospital.findByIdAndRemove(id)

        res.status(204).json({
            ok: true,
            message: 'Hospital deleted'
        })

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected server error. Try again!'
        })
    }

}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}
