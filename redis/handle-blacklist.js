const { promisify } = require('util');
const blacklist = require('./blacklist');
const {createHash} = require('crypto')
const jwt = require('jsonwebtoken')

const insertIntoBlackListAsync = promisify(blacklist.set).bind(blacklist);
const existsInBlackListAsync = promisify(blacklist.exists).bind(blacklist);
const tokenExpiresAt = promisify(blacklist.expireat).bind(blacklist);

function turnIntoHash(token){
    return createHash('sha256').update(token).digest('hex')
}

function timeToExpire(token){
    return jwt.decode(token).exp;
}

class handler{
    static async insert(token){
        const expireTime = timeToExpire(token);
        const hash = turnIntoHash(token)
        await insertIntoBlackListAsync(hash,'');
        await tokenExpiresAt(hash,expireTime)

    }

    static async exists(token){
        const hash = turnIntoHash(token)
        let exists = await existsInBlackListAsync(hash)
        return exists === 1;
    }

  
}

module.exports = handler