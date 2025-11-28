const express = require('express')
const { Signup, OtpVerify } = require('../controllers/AuthControllers')
const Auth = express.Router()


Auth.post('/Auth/Signup' , Signup)
Auth.post('/otp/verify' , OtpVerify)



module.exports = Auth