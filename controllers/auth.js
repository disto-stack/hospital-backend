const User = require('../models/user')

const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')

const login = async (req, res) => {

    const { email, password } = req.body

    try {
        
        const userFromDatabase = await User.findOne({ email })
        if (!userFromDatabase) {
            return res.status(404).json({
                ok: false,
                message: 'Email not found'
            })
        }

        const validPassword = bcrypt.compareSync(password, userFromDatabase.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Invalid password'
            })    
        }

        const token = await generateJWT(userFromDatabase.id)

        res.json({
            ok: true,
            token
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected server error. Try again!'
        })

    }

}

module.exports = {
    login
}