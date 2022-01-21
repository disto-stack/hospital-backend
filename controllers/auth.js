const User = require('../models/user')

const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')
const { verifyGoogleToken } = require('../helpers/googleVerify')

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

const loginWithGoogle = async (req, res) => {

    const { googleToken } = req.body

    try {
        
        const googleUserData = await verifyGoogleToken(googleToken)
        const foundUser = User.findOne({ email: googleUserData.email })

        if (!foundUser) {
            const { name, email, picture } = googleUserData

            const newGoogleUser = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })

            await newGoogleUser.save()

            return res.json({
                ok: true,
                message: 'Created new google user',
                token: await generateJWT(newGoogleUser.id)
            })
        }

        const updatedGoogleUser = foundUser
        updatedGoogleUser.google = true

        updatedGoogleUser.save()

        res.json({
            ok: true,
            message: 'Updated to google user',
            token: await generateJWT(updatedGoogleUser.id)
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            message: 'Invalid google token'
        })
    }
}

const renewToken = async (req, res) => {

    const userId = req.userId
    const token = await generateJWT(userId)

    res.json({
        ok: true,
        token
    })

}

module.exports = {
    login,
    loginWithGoogle,
    renewToken
}