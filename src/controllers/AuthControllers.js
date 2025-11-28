const UserModel = require('../models/UserSchema')
const SendOtp = require('../utils/mail')
const bcrypt = require('bcrypt')
require('dotenv').config()

const Signup = async(req,res)=>{

    try{
         const {fullName , email , Userpassword} = req.body

     // generate otp
      const otp = Math.floor(100000 + Math.random() * 900000);
       
     

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


module.exports = {Signup , OtpVerify}