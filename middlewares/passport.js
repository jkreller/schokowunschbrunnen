/**
 * In this file various passport functions get called
 *
 * @namespace Passport
 * @type {Authenticator}
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

/**
 * Calling passport function
 */
passport.serializeUser(
    /**
     * Describes which data of the user object is stored in the session.
     *
     * @callback serializeUser
     * @memberOf Passport
     * @param user {User} The user object
     * @param done {Function} Passport callback
     */
    function (user, done) {
        done(null, user);
    });

/**
 * Calling passport function
 */
passport.deserializeUser(
    /**
     * Defines the key of the user object
     *
     * @callback deserializeUser
     * @memberOf Passport
     * @param user {User} The user object
     * @param done {Function} Passport callback
     */
    function (user, done) {
        done(null, user);
    });

/**
 * Defines passport middleware
 */
passport.use('local.signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    /**
     * Strategy to be used for sign in.
     *
     * @callback localSignin
     * @memberOf Passport
     * @param email {String} Email from user input
     * @param password {String} Password from user input
     * @param done {Function} Passport callback
     */
    function (email, password, done) {
        // Check if user email exists
        User.findOne({email: email}, function (err, user) {
            // Check if there was an error
            if (err) {
                return done(err);
            }

            // Check if user was found
            if (!user) {
                return done(null, false, {message: 'Falsche E-Mail-Adresse oder Passwort'});
            }

            // Check if correct password
            user.validPassword(password, function (err, res) {
                // Check if there was an error
                if (err) {
                    return done(err);
                }

                // Check if password is valid
                if (!res) {
                    return done(null, false, {message: 'Falsche E-Mail-Adresse oder Passwort'});
                } else {
                    return done(null, user);
                }
            });
        });
    }));

/**
 * Defines passport middleware
 */
passport.use('local.signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    /**
     * Strategy to be used for sign up.
     *
     * @callback localSignup
     * @memberOf Passport
     * @param req {Request} Express.js request object
     * @param email {String} Email from user input
     * @param password {String} Password from user input
     * @param done {Function} Passport callback
     */
    function (req, email, password, done) {
        const fname = req.body.fname;
        const lname = req.body.lname;
        const title = req.body.title;
        const street = req.body.street;
        const postcode = req.body.postcode;
        const city = req.body.city;
        const birthday = Date.parse(req.body.birthday);
        const passwordRepeat = req.body['password-repeat'];

        // Check that fields are not empty
        if (!fname || !lname || !title || !street || !postcode || !city || !birthday) {
            return done(null, false, {message: 'Bitte fülle alle Felder aus'});
        }

        // Check that passwords are equal
        if (password !== passwordRepeat) {
            return done(null, false, {message: 'Die Passwörter stimmen nicht überein'});
        }

        // Check that titles match expected values
        if (title !== 'Herr' && title !== 'Frau') {
            return done(null, false, {message: 'Bitte wähle eine Anrede'});
        }

        User.findOne({email: email}, function (err, user) {
            // Check if there was an error
            if (err) {
                return done(err);
            }

            // Check if user already exists
            if (user) {
                return done(null, false, {message: 'Diese E-Mail-Adresse wurde schon stibitzt'});
            }

            // Hash password
            bcrypt.hash(password, 10, function (err, hash) {
                // Check if there was an error
                if (err) {
                    return done(err);
                }

                // Create user and insert data
                const newUser = new User();

                newUser.email = email;
                newUser.password = hash;
                newUser.fname = fname;
                newUser.lname = lname;
                newUser.title = title;
                newUser.street = street;
                newUser.postcode = postcode;
                newUser.city = city;
                newUser.birthday = birthday;

                // Save user in database
                newUser.save(function (err) {
                    if (err) {
                        return done(err);
                    }
                });

                return done(null, newUser);
            });
        });
    }
));
