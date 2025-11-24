const UserModel = require('../models/UserSchema')
const Signup = async(req,res)=>{

    try{
         const {fullName , email , password} = req.body

   await UserModel.create({
    fullName , email , password
   })

   res.status(200).json({message: ` ${fullName} Signup SuccessFully `})

    }catch(err){
          res.status(501).json({message:  err.message})
    }

}


module.exports = {Signup}