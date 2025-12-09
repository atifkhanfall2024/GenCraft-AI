const mongoose = require('mongoose')

const ChatSchema= new mongoose.Schema({

    chatUser:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"User" ,
        required:true

    } , 

    messages:[
        {
            question: {type:String , required:true},
            responses:{type:String , required:true},
            CreatedAt :{type:Date , default:Date.now()}
        }
    ]


} , {timestamps:true})

 const ChatModel = mongoose.model('Chats' , ChatSchema )


 module.exports = ChatModel