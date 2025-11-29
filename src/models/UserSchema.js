const mongoose = require('mongoose')
const valid = require('validator')
 const UserSchema = new mongoose.Schema({

fullName:{
    type:String,
    required:true,
    minlength: [3, "Name must be at least 3 characters long"]
},
email:{
    type:String,
    required:true,
    unique:[true , 'Email Must Be Unique'],
   validate(value){
    if(!valid.isEmail(value)){
        throw new Error('Email is Incorrect')
    }
   }
},
password:{
    type:String,
    required:true,
     minlength: [6, "passward must be at least 6 characters long"],
    validate(value){
        if(!valid.isStrongPassword(value)){
            throw new Error('Passward Should Be Strong')
        }
    }
},
photoUrl:{
    type:String,
    validate(value){
        if(value && !valid.isURL(value)){
        throw new Error('URL is incorrect') 
        }
    },
    default:'https://png.pngtree.com/png-vector/20210129/ourmid/pngtree-upload-avatar-by-default-png-image_2854358.jpg'
},
isVerifed:{
    type:Boolean,
    default:false
} ,
Otp:{
   type:String
},
isGoogleUser:{
    type:Boolean,
    default:false
}
 } , {timestamps:true})


 module.exports = mongoose.model('User' , UserSchema)

 