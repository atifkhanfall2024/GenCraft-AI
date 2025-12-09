const express = require('express')
const AuthToken = require('../middlewares/AuthToken')
const { UserChat } = require('../controllers/Chat')
const { model } = require('mongoose')
const ChatRoute = express.Router()


ChatRoute.post('/user/chats' ,AuthToken , UserChat  )




module.exports = ChatRoute