const jwt = require('jsonwebtoken')
require('dotenv').config()
const UserModel = require('../models/UserSchema')
const AuthToken = async(req,res , next)=>{

try{// first we need to get token from cookies
const {token} = req.cookies
//console.log(token);
if(!token){
    return res.status(401).json({message:'Token is not present . Please Login ......'})
}

const Verify = jwt.verify(token , process.env.Jwt_Passward)
if(!Verify){
    return res.status(401).json({message:'Something Went Wrong......'})
}
//console.log(Verify);
const user = await UserModel.findById(Verify._id)
if(!user){
      return res.status(404).json({message:'User not found ......'})
}

req.user = user
next()

}catch(e){
    return res.status(401).json({message:e.message})
}
}

module.exports = AuthToken