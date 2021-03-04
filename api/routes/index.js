const bodyParser = require('body-parser');
const users = require('./usersRoute');
const LocalStrategy = require('../Auth/LocalStrategy.js')


module.exports = (app)=>{
    app.use(bodyParser.json());
    app.use(users);
    
}