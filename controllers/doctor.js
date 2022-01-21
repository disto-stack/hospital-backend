const Doctor = require('../models/doctor')

const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')

const getDoctors = async (req, res) => {
    const doctors = await Doctor.find({}, 'name img user hospital')
        .populate('user', 'name')
        .populate('hospital', 'name')

    res.json({
        ok: true,
        doctors
    })
}

const createDoctor = async (req, res) => {
    const userId = req.userId
    if (!userId) {
        res.status(500).json({
            ok: false,
            message: 'Not exists user in the request'
        })
    }

    const doctor = new Doctor({
        user: userId,
        ...req.body
    })
    
    try {

        await doctor.save()

        res.json({
            ok: true,
            doctor
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected server error. Try again!'
        })
    }

}

const updateDoctor = async (req, res) => {
    
    const { id } = req.params
    const userId = req.userId

    try {

        const foundDoctor = Doctor.findById(id)
        if (!foundDoctor) {
            req.status(400).json({
                ok: false,
                message: 'Doctor not found. Try with another id'
            })
        }

        const doctorModified = {
            ...req.body,
            user: userId
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(id, doctorModified, { new: true })

        res.json({
            ok: true,
            updatedDoctor
        })

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected server error. Try again!'
        })
    }

}

const deleteDoctor = async (req, res) => {
    
    const { id } = req.params

    try {

        await Doctor.findByIdAndRemove(id)

        res.status(204).json({
            ok: true,
            message: 'Doctor deleted'
        })

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected server error. Try again!'
        })
    }

}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}
