const User = require('../models/user')
const Hospital = require('../models/hospital')
const Doctor = require('../models/doctor')

const fs = require('fs')

const updateImagePath = async (type, id, fileName) => {

    const foundModel = await getModelByType(type, id)
    if (!foundModel) {
        fs.unlinkSync(`./uploads/${type}/${fileName}`)
        return false
    }

    return await updateModelImagePath(type, foundModel, fileName)
        
}

const getModelByType = (type, id) => {
    const typesObject = {
        'users': (async () => await User.findById(id))(),
        'doctors': (async () =>  await Doctor.findById(id))(),
        'hospitals': (async () => await Hospital.findById(id))()
    }

    return typesObject[type]
}

const updateModelImagePath = async (type, model, fileName) => {
    const previousPath = `./uploads/${type}/${model.img}`
    if (fs.existsSync(previousPath)) {
        fs.unlinkSync(previousPath)
    }

    model.img = fileName
    await model.save()

    return true
}

module.exports = {
    updateImagePath
}