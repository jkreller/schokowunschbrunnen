const express = require('express');
const router = express.Router();
const passport = require('passport');
const loginHandler = require('../middlewares/LoginHandler');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

/* GET register. */
router.get('/register', function (req, res, next) {
    res.render('user/registrieren', {message: req.flash('error')});
});

/* POST register. */
router.post('/register', passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/user/register',
    badRequestMessage: 'Da fehlt aber noch was...!?',
    failureFlash: true
}));

/* GET login. */
router.get('/login', function (req, res, next) {
    res.render('user/anmelden', {message: req.flash('error')});
});

/* POST login. */
router.post('/login', passport.authenticate('local.signin', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    badRequestMessage: 'Da fehlt aber noch was...!?',
    failureFlash: true
}));

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

/* GET profile. */
router.get('/profile', loginHandler.ensureAuthentication, function (req, res, next) {
    res.render('user/profil', {user: req.user});
});

/* GET profile edit. */
router.get('/profile/edit', loginHandler.ensureAuthentication, function (req, res, next) {
    res.render('user/profil', {user: req.user, edit: true});
});

/* POST profile edit. */
router.post('/profile/edit', loginHandler.ensureAuthentication, function (req, res, next) {
    res.render('user/profil', {user: req.user, edit: false});
});

router.get('/profile/edit-password', loginHandler.ensureAuthentication, function (req, res, next) {
    res.render('user/change-password', {user: req.user});
});

router.post('/profile/edit-password', loginHandler.ensureAuthentication, function (req, res, next) {
    console.log("es geht los");
    bcrypt.hash(req.body.oldpassword, 10, function (err, hash) {

        console.log(hash);
        console.log(req.user.password);
        if (err) {
            return done(err);
        }
        if (req.user.password === hash) {
            console.log("altes passwort korrekt");
            if (req.body.password === req.body.passwordrepeat) {

                console.log("passwörter sind gleich");
                bcrypt.hash(req.body.password, 10, function (err, hash2) {
                    if (err) {
                        next(err);
                    }

                    User.findOneAndUpdate({_id: req.user.id}
                        , {$set: {password: hash2}}
                        , function (err, doc) {

                            if (err) {

                                console.log("update document error");

                            } else {

                                res.render('user/profil', {message: 'Passwort wurde erfolgreich geändert.'});
                                console.log("update document success");
                            }

                        });
                });

            }
            else {
                res.render('user/change-password', {message: 'Passwörter stimmen nicht überein!'});
            }
        }
        else {
            res.render('user/change-password', {message: 'Falsches Passwort!'});

        }


    });
});

module.exports = router;
