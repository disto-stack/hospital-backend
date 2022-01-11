const User = require('../models/user')

const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')

const getUsers = async (req, res) => {
    const users = await User.find({}, 'name email role google')

    res.json({
        ok: true,
        users,
        userId: req.userId
    })
}

const createUser = async (req, res) => {
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

        const token = await generateJWT(user.id)

        res.json({
            ok: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            token
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: 'Unexpected server error. Try again!'
        })

    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id

    try {

        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'User does not exists'
            })
        }

        // TODO: validate token
        
        const { password, google, email, ...fieldsToUpdate} = req.body

        if (user.email !== email) {
            existsEmail = await User.findOne({ email: req.body.email })

            if (existsEmail) {
                return res.status(400).json({
                    ok: false,
                    message: 'The email already exists'
                })
            }
        }

        fieldsToUpdate.email = email

        await User.findByIdAndUpdate(userId, fieldsToUpdate)

        res.json({
            ok: true,
            message: 'User successfully updated'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected server error. Try again!'
        })
        
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.id
    
    try {
        
        const userToDelete = await User.findById(userId)

        if (!userToDelete) {
            return res.status(400).json({
                ok: false,
                message: 'User does not exists'
            })
        }

        await User.findByIdAndDelete(userId)
        
        res.json({
            ok: true,
            message: 'User successfully deleted'
        })
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            message: 'Unexpected server error. Try again!'
        })
    
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
