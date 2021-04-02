/**
 * In this file the express router functions get/post are called
 *
 * @namespace UserRoute
 * @type {createApplication}
 */

const express = require('express');
const router = express.Router();
const moment = require('moment');
const {check, validationResult} = require('express-validator/check');
const passport = require('passport');
const loginHandler = require('../middlewares/LoginHandler');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

/**
 * GET register.
 */
router.get('/register',
    /**
     * Register (GET)
     *
     * @callback getRegister
     * @memberOf UserRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    function (req, res, next) {
    res.render('user/register', {message: req.flash('error')});
});

/**
 * POST register.
 */
router.post('/register', passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/user/register',
    badRequestMessage: 'Da fehlt aber noch was...!?',
    failureFlash: true
}));

/**
 * GET login.
 */
router.get('/login',
    /**
     * Login (GET)
     *
     * @callback getLogin
     * @memberOf UserRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    function (req, res, next) {
    res.render('user/login', {message: req.flash('error')});
});

/**
 * POST login.
 */
router.post('/login', passport.authenticate('local.signin', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    badRequestMessage: 'Da fehlt aber noch was...!?',
    failureFlash: true
}));

/**
 * GET logout.
 */
router.get('/logout',
    /**
     * Logout (GET)
     *
     * @callback getLogout
     * @memberOf UserRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    function (req, res, next) {
    req.logout();
    res.redirect('/');
});

/**
 * GET profile.
 */
router.get('/profile', loginHandler.ensureAuthentication,
    /**
     * Profile (GET)
     *
     * @callback getProfile
     * @memberOf UserRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    function (req, res, next) {
    const birthdayFormatted = moment(req.user.birthday).format('DD.MM.YYYY');
    res.render('user/profile', {birthdayFormatted: birthdayFormatted});
});

/**
 * GET profile edit.
 */
router.get('/profile/edit', loginHandler.ensureAuthentication, function (req, res, next) {
    const birthdayFormatted = moment(req.user.birthday).format('YYYY-MM-DD');
    res.render('user/profile', {birthdayFormatted: birthdayFormatted, edit: true});
});

/**
 * POST profile edit.
 */
router.post('/profile/edit', [
    // Check fields with various validations
    check(['title', 'fname', 'lname', 'email', 'street', 'postcode', 'city', 'birthday', 'password'], 'Bitte fülle dieses Feld aus.').not().isEmpty(),
    check('email').isEmail().withMessage('Bitte gebe eine valide E-Mail Adresse an.'),
    check('birthday').isBefore(moment().format('YYYY-MM-DD')).withMessage('Das ist etwas zu jung...'),
    check('password').custom(async (password, {req}) => {
        const passwordMatch = await bcrypt.compare(password, req.user.password);
        if (!passwordMatch) {
            throw new Error('Das angegebene Passwort ist falsch.');
        }
        return true;
    }),
], loginHandler.ensureAuthentication,
    /**
     * Edit Profile (POST)
     *
     * @callback postEditProfile
     * @memberOf UserRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    async function (req, res, next) {
    const errors = validationResult(req);
    delete req.body.password;

    if (errors.isEmpty()) {
        const userId = req.user['_id'];

        try {
            // Update user and redirect
            await User.updateOne({_id: userId}, req.body, {runValidators: true});
            req.login(await User.findById(userId), function (err) {
                if (err) {
                    next(err);
                }
                res.redirect('/user/profile');
            });
        } catch (e) {
            next(e);
        }
    } else {
        res.render('user/profile', {
            birthdayFormatted: req.body.birthday,
            edit: true,
            user: req.body,
            errors: errors.mapped()
        });
    }
});

/**
 * GET profile edit password.
 */
router.get('/profile/edit-password', loginHandler.ensureAuthentication,
    /**
     * Edit Password (GET)
     *
     * @callback getEditPassword
     * @memberOf UserRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    function (req, res, next) {
    res.render('user/change-password');
});

/**
 * POST profile edit password.
 */
router.post('/profile/edit-password', loginHandler.ensureAuthentication,
    /**
     * Edit Password (POST)
     *
     * @callback postEditPassword
     * @memberOf UserRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    async function (req, res, next) {
    let oldPasswordMatch;

    try {
        // Check if password is right
        oldPasswordMatch = await bcrypt.compare(req.body.oldpassword, req.user.password);
    } catch (e) {
        next(e);
    }

    if (oldPasswordMatch) {
        // Check if new password is repeated right
        if (req.body.password === req.body.passwordrepeat) {
            // Hash password and update user
            bcrypt.hash(req.body.password, 10, function (err, hash2) {
                if (err) {
                    next(err);
                }

                const newUser = {
                    'password': hash2
                };

                User.findByIdAndUpdate(req.user._id, newUser).then(function (err) {
                    res.render('user/profile');
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
