const UserModel = require('../models/UserSchema')
const SendOtp = require('../utils/mail')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
require('dotenv').config()

const Signup = async(req,res)=>{

    try{
         const {fullName , email , Userpassword} = req.body

     // generate otp
      const otp = Math.floor(100000 + Math.random() * 900000);
       
     if(!validator.isStrongPassword(Userpassword)){
            return res.status(401).json({message:"Passward Should Be Strong"})
     }

     if(!validator.isEmail(email)){
           return res.status(401).json({message:"Email is Incorrect"})
     }
      // store hashes otp in database
  const Hashotp = await bcrypt.hash(String(otp) , 10)
 const password = await bcrypt.hash(Userpassword , 10)
     // const Hashotp = await 

// also for same email donot send otp

 if(email === process.env.Email){
      return res.status(501).json({message:"You cannot send otp to yourself"})
 }

   await UserModel.create({
    fullName , email , password , Otp:Hashotp
   })
  // to store session email
    req.session.email = email
   //console.log( 'email' , req.session.email);
    await SendOtp(email , otp)

   

 return  res.status(200).json({message: ` ${fullName} . Please Check Email and Verify Opt In a Minute. `})

    }catch(err){
         return  res.status(501).json({message:  err.message})
    }

}


// api for verification of otp

const OtpVerify = async(req,res)=>{
      try{
            const {otp} = req.body
            const email = req.session.email
            //console.log(email);
            // find email in database

//             if (!email) return res.status(400).json({ message: "Session expired or missing" });

// console.log("Verifying OTP for:", email);

            const user = await UserModel.findOne({email:email})
            if(!user){
                  return res.status(404).json({message:'User not found'})
            }
            
            // now comapre otps

            const compare = await bcrypt.compare(otp , user.Otp)
            if(!compare){
                    return res.status(501).json({message:'Otp Not Match'})
            }

            user.isVerifed = true
            user.Otp = ''
            req.session.destroy()

            await user.save()

            return res.status(200).json({message:'Otp verified Success'})

      }catch(err){
             return res.status(200).json({message:err.message})
      }
}


// Signup with google 


const SignupGoogle = async(req,res)=>{

    try{
         const {fullName , email} = req.body

    
 if(email === process.env.Email){
      return res.status(501).json({message:"You cannot send otp to yourself"})
 }

   await UserModel.create({
    fullName , email ,
     isGoogleUser:true
   })
  // to store session email
    req.session.email = email
   //console.log( 'email' , req.session.email);
 

   

 return  res.status(200).json({message: ` ${fullName} . Signup Success. `})

    }catch(err){
         return  res.status(501).json({message:  err.message})
    }

}



// working with login Api

const Login = async(req,res)=>{
      try{

  const {email  , Userpassword} = req.body

  const User = await UserModel.findOne({email:email})
  if(!User){
      return res.status(401).json({message:'Invalid Credantials......'})
  }

  // also check passward 

  const VerifyPassward = await bcrypt.compare(Userpassword , User.password)
  if(!VerifyPassward){
       return res.status(401).json({message:'Invalid Credantials......'})
  }

  // now make cookies

  const token = jwt.sign({_id:User._id} , process.env.Jwt_Passward , {expiresIn:'1d'}) 
  //console.log(token);

 res.cookie("token", token, {
    httpOnly: true,        
    secure: true,          
    sameSite: "strict"     
});

  return res.status(200).json({message:`${User.fullName}  Login Success.....`})


      }catch(err){
        return res.status(401).json({message:err.message})
      }
}

// logout api

const Logout = async(req,res)=>{

      try{

            res.clearCookie('token').status(200).json({message:'Logout Success'})

      }catch(err){
   return res.status(401).json({message:err.message})
      }
}


module.exports = {Signup , OtpVerify ,SignupGoogle , Login , Logout}