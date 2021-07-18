const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models');
const md5 = require('md5');

/**
 * Define our Local Strategy
 */
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        // this function is called on authenticate to test if the user's credentials are valid
        async function (username, password, done) {

            //fetch user from database
            const user = await User.findOne({
                where: {
                    email: username
                }
            });
            //if no user, or passwords do not match, call done with a failure message
            if (!user || md5(password) !== user.password) {
                return done(null, false, {message: 'Incorrect email or password.'});
            }

            //passed authentication, so user passes
            return done(null, {
                id: user.id,
                username: user.email,
                email: user.email,
                displayName: user.first_name
            });

        }
    )
);

//turn user object into an object that can be passed into a cookie
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        console.log({ message:'serializeUser', user});
        cb(null, {id: user.id, username: user.email, email: user.email, displayName: user.displayName});
    });
});

//turn  serialized object back into an object.  in our case, we don't need to do anything.
passport.deserializeUser(async function (user, cb) {

    // const dbUser = await User.findByPk(user.id);
    process.nextTick(function () {
        return cb(null, user);
    });
});


