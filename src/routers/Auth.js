const express = require('express')
const { Signup, OtpVerify, SignupGoogle, Login, Logout } = require('../controllers/AuthControllers')
const AuthToken = require('../middlewares/AuthToken')
const Auth = express.Router()


Auth.post('/Auth/Signup' , Signup)
Auth.post('/Auth/Login' , Login)
Auth.post('/Auth/Logout' , AuthToken , Logout)
Auth.post('/otp/verify' , OtpVerify)
Auth.post('/Signup/Google' , SignupGoogle)



module.exports = Auth