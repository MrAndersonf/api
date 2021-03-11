const jwt = require('jsonwebtoken')

class token {
    static create(user){
        const payload = {
            id: user.id
        }
        const generatedToken = jwt.sign(payload, process.env.SECURE_KEY,{expiresIn:'15m'})
        return generatedToken
    }
}

module.exports = token