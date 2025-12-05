const express = require('express')
const {GetUserData, UpdateProfile} = require('../controllers/ProfileRoute')
const AuthMiddleWare = require('../middlewares/AuthToken')

const ProfileRoute = express.Router()


ProfileRoute.get('/get/user/data' , AuthMiddleWare , GetUserData)
ProfileRoute.post('/updateProfile' , AuthMiddleWare , UpdateProfile)



module.exports = ProfileRoute