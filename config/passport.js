const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const key = require('./keys');

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
            clientID: key.googleClientID,
            clientSecret: key.googleClientScret,
            callbackURL: "http://localhost:5000/auth/google/callback",
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(accessToken);
            console.log(profile);

    }))
};