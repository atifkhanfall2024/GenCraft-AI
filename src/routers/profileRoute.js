const express = require('express')
const GetUserData = require('../controllers/ProfileRoute')
const AuthMiddleWare = require('../middlewares/AuthToken')

const ProfileRoute = express.Router()


ProfileRoute.get('/get/user/data' , AuthMiddleWare , GetUserData)



module.exports = ProfileRoute