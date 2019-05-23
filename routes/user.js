const express = require('express');
const router = express.Router();
const moment = require('moment');
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
    const birthdayFormatted = moment().format('DD.MM.YYYY');
    res.render('user/profil', {user: req.user, birthdayFormatted: birthdayFormatted});
});

/* GET profile edit. */
router.get('/profile/edit', loginHandler.ensureAuthentication, function (req, res, next) {
    const birthdayFormatted = moment().format('YYYY-MM-DD');
    res.render('user/profil', {user: req.user, birthdayFormatted: birthdayFormatted, edit: true});
});

/* POST profile edit. */
router.post('/profile/edit', loginHandler.ensureAuthentication, function (req, res, next) {
    res.render('user/profil', {user: req.user, edit: false});
});

router.get('/profile/edit-password', loginHandler.ensureAuthentication, function (req, res, next) {
    res.render('user/change-password', {user: req.user});
});

router.post('/profile/edit-password', loginHandler.ensureAuthentication, async function (req, res, next) {
    console.log("es geht los");
    let oldPasswordMatch;
    try {
        oldPasswordMatch = await bcrypt.compare(req.body.oldpassword, req.user.password);
    } catch (e) {
        next(e);
    }

    if (oldPasswordMatch) {
        if (req.body.password === req.body.passwordrepeat) {

            bcrypt.hash(req.body.password, 10, function (err, hash2) {
                if (err) {
                    next(err);
                }
                const newUser = {
                    "password": hash2
                };
                User.findByIdAndUpdate(req.user._id, newUser).then(function (err) {

                    res.render('user/profil');

                });

            });

        } else {
            res.render('user/change-password', {message: 'Passwörter stimmen nicht überein!'});
        }
    } else {
        res.render('user/change-password', {message: 'Falsches Passwort!'});

    }
});

module.exports = router;
