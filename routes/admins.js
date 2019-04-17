var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Admin = require('../models/admin');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
    res.render('register', {title:'Register'});
});

router.get('/login', function(req, res, next) {
    res.render('login', {title:'Login'});
});

router.post('/login',
    passport.authenticate('local', {failureRedirect:'/admins/login', failureFlash: 'Invalid username or password'}),
    function(req, res) {
        req.flash('success', 'You are logged in');
        res.redirect('/');
});

passport.serializeUser(function(admin, done) {
    done(null, admin.id);
});

passport.deserializeUser(function(id, done) {
    Admin.getAdminById(id, function(err, admin) {
        done(err, admin);
    });
});

passport.use(new LocalStrategy(function (username, password, done) {
    Admin.getAdminByUsername(username, function (err, admin) {
        if(err) throw err;
        if(!admin) {
            return done (null, false, {message: 'Unknown Admin'});
        }

        Admin.comparePassword(password, admin.password, function (err, isMatch) {
            if(err) return done(err);
            if(isMatch) {
                return done(null, admin);
            } else {
                return done(null, false, {message: 'Invalid Password'})
            }
        })
        
    });
}));

router.post('/register', function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();

    if(errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        var newAdmin = new Admin({
            name:name,
            email: email,
            username: username,
            password: password
        });

        Admin.createAdmin(newAdmin, function (err, admin) {
            if(err) throw err;
            console.log(admin)
        });

        req.flash('success', 'You are registered and can login');

        res.location('/');
        res.redirect('/');

    }
});

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/admins/login')
});

module.exports = router;