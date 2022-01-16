const User = require('../models/user')
const Hospital = require('../models/hospital')
const Doctor = require('../models/doctor')

const searchAll = async (req, res) => {

    const searchParam = req.params.searchParam
    const regex = new RegExp(searchParam, 'i')

    const [foundUsers, foundHospitals, foundDoctors] = await Promise.all([
        User.find({
            "$or": [
                {
                    "name": regex
                },
                {
                    "email": regex
                }
            ]
        }),
        Hospital.find({
            "name": regex
        }),
        Doctor.find({
            "name": regex
        })
    ])

    res.json({
        ok: true,
        foundUsers,
        foundHospitals,
        foundDoctors
    })

}

const searchInCollection = async (req, res) => {

    const collectionToSearch = req.params.collectionToSearch
    const searchParam = req.params.searchParam

    const regex = new RegExp(searchParam, 'i')

    const searchInCollection = getDataByCollectionName(collectionToSearch, regex)
    if (!searchInCollection) {
        return res.status(400).json({
            ok: false,
            message: 'Invalid collection to search'
        })
    }

    const collectionData = await searchInCollection()
    res.json({
        ok: true,
        collectionData
    })
}

const getDataByCollectionName = (collectionName, regex) => {

    const collectionsFunctions = {
        'users': () => {
            return User.find({
                "$or": [
                    {
                        "name": regex
                    },
                    {
                        "email": regex
                    }
                ]
            })
        },
        'hospitals': () => {
            return Hospital.find({
                "name": regex
            })
            .populate('user', 'name img')
        },
        'doctors': () => {
            return Doctor.find({
                "name": regex
            })
            .populate('user', 'name img')
            .populate('hospital', 'name')
        }
    }

    return collectionsFunctions[collectionName]
}

module.exports = {
    searchAll,
    searchInCollection
}