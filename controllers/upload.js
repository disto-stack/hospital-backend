const { v4: uuidv4 } = require('uuid')

const { updateImagePath } = require('../helpers/updateImagePath')

const path = require('path')
const fs = require('fs')

const uploadFile = (req, res) => {
    const validTypes = ['hospitals', 'doctors', 'users']
    
    const { collection, objectId  } = req.params
    if (!validTypes.includes(collection)) {
        return res.status(400).json({
            ok: false,
            message: 'Is not a doctor, hospital or a user'
        })
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            message: 'There are not files in the request'
        })
    }

    const file = req.files.img
    const fileExtension = file.name.split('.').slice(-1)[0]

    const validExtensions = ['png', 'jpeg', 'jpg', 'webp', 'gif']
    if (!validExtensions.includes(fileExtension)) {
        return res.status(400).json({
            ok: false,
            message: 'The file type is not valid'
        })
    }

    const generatedFileName = `${uuidv4()}.${fileExtension}`

    file.mv(`./uploads/${collection}/${generatedFileName}`, async (error) => {
        if (error) {
            res.status(500).json({
                ok: false, 
                message: 'Error uploading file',
                error
            })
        }

        const imageIsUpdated = await updateImagePath(collection, objectId, generatedFileName)
        if (!imageIsUpdated) {
            res.status(500).json({
                ok: false, 
                message: 'Error uploading file',
            })
        }

        res.json({
            ok: true,
            message: 'File uploaded',
            nameFile: generatedFileName
        })
    })

}

const getFile = (req, res) => {

    const { collection, fileName } = req.params

    const filePath = path.join(__dirname, '../uploads', collection, fileName)

    if (!fs.existsSync(filePath)) {
        res.status(400).json({
            ok: false,
            message: 'Not exists the file'
        })
    }
    
    res.sendFile(filePath)

}

module.exports = {
    uploadFile,
    getFile
}