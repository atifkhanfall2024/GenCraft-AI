require('dotenv').config()
const {GoogleGenAI} = require('@google/genai');
const ChatModel = require('../models/ChatModel');
const userModel = require('../models/UserSchema')

const UserChat = async(req,res)=>{
//console.log("API key:", process.env.GEMINI_API_KEY);
//console.log(process.env.Jwt_Passward);

    try{
     const {question} = req.body
  if (!question) return res.status(400).json({ message: "Question is required" });
//console.log("Loaded API:", process.env.KEY);

       const ai =  new GoogleGenAI({ apiKey: process.env.KEY });
    // console.log(ai);
   // console.log("Loaded API:", process.env.KEY);

    const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: question
});
     // console.log(response.text);

    const user = await userModel.find(req.user._id)

    if(!user){
        return res.status(404).json({message:'User Not found'})
    }
       await ChatModel.create({
        messages: [
    {
      question,
      responses: response.text
    }
  ],
        chatUser: req.user._id
      })

  res.json({ text: response.text });


    }catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }

}


module.exports = {UserChat}