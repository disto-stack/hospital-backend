const User = require('../models/users')

const bcrypt = require('bcryptjs')

const getUsers = async (req, res) => {
    const users = await User.find({}, 'name email role google')

    res.json({
        ok: true,
        users
    })
}

const createUsers = async (req, res) => {
    const { email, password } = req.body

    try {

        const existsEmail = await User.findOne({ email })
        if (existsEmail) {
            return res.status(400).json({
                ok: false,
                message: 'The email already exists'
            })
        }

        const user = new User(req.body)

        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        res.json({
            ok: true,
            message: 'User saved successfully!'
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: 'Unexpected error... review logs'
        })

    }


}


module.exports = {
    getUsers,
    createUsers
}
