const getData = async(req,res)=>{
try{

 const name = "Muhammad Atif khan"
 const age = 22

res.send(name + age )

}catch(err){
    res.send(err.message)
}
}


module.exports = {getData}