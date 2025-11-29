const express = require('express')
const Database_Connection = require('./config/Db')
const AuthRoute = require('./routers/Auth')
const session = require('express-session');
const cookie_parser = require('cookie-parser')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cookie_parser())
app.use(session({
    secret: process.env.SESSION_SECRET, // required
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // session valid for 1 min (example)
}));

app.use('/' , AuthRoute)


Database_Connection().then(()=>{
    console.log('Database Connection is Success');
    app.listen(4000 , ()=>{
    console.log('server is Listening At port 4000 ......');
})
}).catch((e)=>{
    console.log('Connection Falied ' , e.message);
})
