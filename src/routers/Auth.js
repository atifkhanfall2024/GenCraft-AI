const express = require('express')
const { Signup } = require('../controllers/AuthControllers')
const Auth = express.Router()


Auth.post('/Auth/Signup' , Signup)



module.exports = Auth