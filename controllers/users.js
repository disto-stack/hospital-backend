const User = require('../models/users')

const getUsers = (req, res) => {
    res.json({
        ok: true,
        users: []
    })
}

const createUsers = async (req, res) => {
    const user = new User(req.body)

    await user.save();

    res.json({
        ok: true,
        message: 'User saved!',
        user
    })
}


module.exports = {
    getUsers,
    createUsers
}
