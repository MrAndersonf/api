const bcrypt = require('bcrypt');


class Auth{
    static async encrypt(password){
        return await bcrypt.hash(password,12)
    }
}


module.exports = Auth