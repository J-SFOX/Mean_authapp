const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User =require('../models/user')
const dbConfig = require('../config/database')

module.exports = function (passport) {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = dbConfig.secret
    // console.log("passport call")
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload.data._id , (err, user) => {
            console.log(jwt_payload)
            if(err){
                return done(err, false)
            }
            if(user){
                return done(null, user)
            }else{
                return done(null, false)
                // create an new account
            }
        })
    }));
}