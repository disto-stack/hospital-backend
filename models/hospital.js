const { Schema, model } = require("mongoose");

const hospitalSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
})

module.exports = model('hospital', hospitalSchema)