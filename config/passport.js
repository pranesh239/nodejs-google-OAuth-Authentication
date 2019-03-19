const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const key = require('./keys');
const { User } = require('../models/User');

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: key.googleClientID,
        clientSecret: key.googleClientScret,
        callbackURL: "/auth/google/callback",
        proxy: true
    },
        async (accessToken, refreshToken, profile, done) => {

            const newUser = {
                googleId: profile.id,
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            };

            let user = await User.findOne({
                googleId: newUser.googleId
            });
            if (user) {
                done(null, user);
            }
            else {
                user =  new User(newUser);
                await user.save();
                done(null, user)
            }

        }));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};