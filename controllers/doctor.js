const Doctor = require('../models/doctor')

const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')

const getDoctors = async (req, res) => {
    const users = await User.find({}, 'name email role google')

    res.json({
        ok: true,
        msg: 'hi'
    })
}

const createDoctor = async (req, res) => {
    
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
