const UserModel = require('../models/UserSchema')

const GetUserData = async(req,res)=>{
    
    try{
        
    const userData = req.user

    if(!userData){
        return res.status(401).json({message:'User Not Present'})
    }

    return res.status(200).json({message:userData})
    }catch(err){
         return res.status(401).json({message:err.message})
    }
}


// update profile Route

const UpdateProfile = async(req,res)=>{
   
    try{
        
    const user_id = req.user._id
    const {photoUrl , fullName , description , phoneNumber} = req.body


    // update user by id

    const user = await UserModel.findByIdAndUpdate(user_id , {
        photoUrl ,
        phoneNumber,
        fullName ,
        description
    })

    if(!user){
        return res.status(404).json({message:'User Not Found'})
    }

    await user.save()

    return res.status(200).json({message:user})
    }catch(e){
        return res.status(401).json({message:e.message})
    }

}

module.exports = {GetUserData , UpdateProfile}