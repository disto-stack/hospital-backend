const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GoogleClientId)

const verifyGoogleToken = async (token) => {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GoogleClientId,
    })

    const payload = ticket.getPayload()
    const userId = payload['sub']

    const { name, email, picture } = payload
    
    return { name, email, picture }

}

module.exports = {
    verifyGoogleToken
}