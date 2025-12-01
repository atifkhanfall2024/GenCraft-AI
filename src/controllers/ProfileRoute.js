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

module.exports = GetUserData