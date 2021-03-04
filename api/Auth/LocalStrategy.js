const bcrypt = require('bcrypt');
const passport = require('passport');

const database = require('../models')
const LocalStrategy =  require('passport-local').Strategy;

function UserException(message) {
    this.message = message;
    this.name = "UserException";
}

function isValidUser(user){
    if(!user)
        throw new UserException("Invalid user");
}

async function isValidPassword(password, encPassword){
    let valid = await bcrypt.compare(password,encPassword);
    console.log(valid)
    if(!valid)
        throw new UserException("Invalid pass");
}

passport.use(
    new LocalStrategy({
        passwordField:'password',
        usernameField:'email',
        session:false
    }, async (email, password, done) => {
        try {
            const user = await database.Users.findOne({where:{email:email}});
            isValidUser(user);
            await isValidPassword(password,user.password)
            done(null,user);            
        } catch (error) {
            done(error)
        }

    })
);




