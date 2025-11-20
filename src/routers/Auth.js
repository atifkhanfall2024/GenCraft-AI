const express = require('express')
const { getData } = require('../controllers/AuthControllers')
const Auth = express.Router()


Auth.get('/getdata' , getData)



module.exports = Auth