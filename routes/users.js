const express = require("express")
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const dbConfig = require("../config/database")

// Register user 
router.post("/register", (req,res,next) => {
    
    let newUser = new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
    });

    User.addUser(newUser, (err, user)=>{
        if(err){
            res.json({success:false, msg: "failed to register user"})
        }else{
            res.json({success:true, msg: "user registred"})
        }
    })
})

// Authenticater user 
router.post("/authenticate", (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, _user)=> {
        // error handling
        if(err) throw err;
        // if there is not user
        if(!_user){
            res.json({success:false, msg: "User Not Found"})
        }else{
            User.comparePassword(password, _user.password, (_err, isMatch) => {
                if (_err) throw _err;
                if(isMatch){
                    const token = jwt.sign({ data: _user }, dbConfig.secret, {
                        expiresIn : 604800 // 1 week
                    });
    
                    res.json({
                        success: true,
                        token : `JWT ${token}`,
                        user : {
                            id: _user._id,
                            name: _user.name,
                            username: _user.username,
                            email: _user.email
                        },
                        msg : "user authenticated"
                    })
                }
                else {
                    res.json({success:false, msg: "Wrong password "})
                }
            })
        }
      
    })
})


// Profile 
//  session :false ithink i should make it  true 
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log("Here we go ")
    res.json({
        user: {
            _id: req.user._id,
            name: req.user.name,
            username: req.user.username,
            email: req.user.email,
          }
     })
    
})



module.exports = router