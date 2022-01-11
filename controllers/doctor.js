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
    
}

const deleteDoctor = async (req, res) => {
    
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}
