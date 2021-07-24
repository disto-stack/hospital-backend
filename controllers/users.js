const User = require('../models/users')

const getUsers = async (req, res) => {
    const users = await User.find({}, 'name email role google')

    res.json({
        ok: true,
        users
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
