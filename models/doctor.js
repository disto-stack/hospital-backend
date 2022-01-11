const { Schema, model } = require("mongoose");

const doctorSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'hospital'
    }
})

module.exports = model('doctor', doctorSchema)