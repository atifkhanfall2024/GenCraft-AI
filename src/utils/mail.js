const Nodemailer = require('nodemailer')
require('dotenv').config()


// create transporter 

const SendOtp = async(email , otp)=>{

  try{
      const transporter = Nodemailer.createTransport(
        {
            service:"gmail",
            auth:{
                user:process.env.email,
                pass:process.env.passward
            }
        }
    )


     const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Verification Code",
      html: `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1 style="letter-spacing:4px">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `
    };

     await transporter.sendMail(mailOptions);

     return true
  }catch(e){
    return false 
  }

}

module.exports = SendOtp