const express = require('express')
const Database_Connection = require('./config/Db')
const AuthRoute = require('./routers/Auth')
const app = express()

app.use(express.json())
app.use('/' , AuthRoute)


Database_Connection().then(()=>{
    console.log('Database Connection is Success');
    app.listen(4000 , ()=>{
    console.log('server is Listening At port 4000 ......');
})
}).catch((e)=>{
    console.log('Connection Falied ' , e.message);
})
