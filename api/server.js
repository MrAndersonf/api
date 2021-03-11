require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const blacklist =  require('../redis/blacklist')

const app = express();
routes(app);


const onConnected = ()=>{
    console.log(`API running on port ${process.env.API_PORT}`)
}


app.listen(process.env.API_PORT,onConnected)