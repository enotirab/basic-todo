const md5 = require('md5');
const {User} = require('../models');
const {sanitizeBody, body} = require('express-validator');
const passport = require('passport')

module.exports.showRegistrationForm = (req, res) => {
    res.render('register')
}


module.exports.registerUser = async (req, res) => {

    const user = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: md5(req.body.password),
    })

    res.redirect('/');
}


module.exports.showLoginForm = (req, res) => {

    console.log({
        authed: req.isAuthenticated(),
        user: req.user
    });
    res.render('login');
}

module.exports.loginUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
});
// module.exports.loginUser = passport.authenticate('local');
