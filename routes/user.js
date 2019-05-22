const express = require('express');
const router = express.Router();
const passport = require('passport');
const loginHandler = require('../middlewares/LoginHandler');

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

module.exports = router;
