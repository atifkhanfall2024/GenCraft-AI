const mongoose = require('mongoose')
require('dotenv').config()
const Database_Connection = async ()=>{
    await mongoose.connect(process.env.Db_string)
}

module.exports = Database_Connection