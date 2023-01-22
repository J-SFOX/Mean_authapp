const express = require("express")
const path = require("path")
const bodyParser= require("body-parser")
const cors = require("cors")
const passport = require("passport")
const mongoose = require("mongoose")
const dbConfig = require("./config/database")
const session = require('express-session')



mongoose.connect(dbConfig.database)

// OnConnection Succeed
mongoose.connection.on("connected", ()=>{
    console.log("Connected to DB " + dbConfig.database)
})

// OnError
mongoose.connection.on('error',(er)=>{
    console.log("Connection Error "+ er )
})


const app = express()


const users = require('./routes/users')

// port number
const port = 3000

// Cors Middleware
app.use(cors())


// Set Static Folder 
app.use(express.static(path.join(__dirname, "public")))

// Body Parser Middleware
app.use(bodyParser.json())

// Passport middleware
app.use(session({
    secret: dbConfig.secret
}))
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)


app.use('/users', users)

// Index Route
app.get("/" , (req, res)=>{
    res.send(" Invalid Endpoint ")
})


// Start Server 
app.listen(port, () => {
    console.log("seerver is running in port :" +port)
})




// mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.database, {
//     useNewUrlParser: true,
//     user: dbConfig.user,
//     pass: dbConfig.pwd
// }).then(() => {
//     console.log('successfully connected to the database');
// }).catch(err => {
//     console.log('error connecting to the database');
//     console.log(err)
//     process.exit();
// });
