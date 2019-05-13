const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const uniqid = require('uniqid');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, function (email, password, done) {
  //check if user email exists
  User.findOne({email: email}, function (err, user) {
    //when error
    if (err) {
      return done(err);
    }

    //when don't found email
    if (!user) {
      return done(null, false, {message: 'Falsche E-Mail-Adresse oder Passwort'});
    }

    //check if correct password
    user.validPassword(password, function (err, res) {
      if (err) {
        return done(err);
      }

      if (!res) {
        return done(null, false, {message: 'Falsche E-Mail-Adresse oder Passwort'});
      } else {
        return done(null, user);
      }
    });
  });
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const title = req.body.title;
    const street = req.body.street;
    const postcode = req.body.postcode;
    const city = req.body.city;
    const birthday = Date.parse(req.body.birthday);
    const passwordRepeat = req.body['password-repeat'];

    if (!fname || !lname || !title || !street || !postcode || !city || !birthday) {
      return done(null, false, {message: 'Bitte fülle alle Felder aus'});
    }

    if (password !== passwordRepeat) {
      return done(null, false, {message: 'Die Passwörter stimmen nicht überein'});
    }

    if (title !== 'Herr' && title !== 'Frau') {
      return done(null, false, {message: 'Bitte wähle eine Anrede'});
    }

    User.findOne({email: email}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, {message: 'Diese E-Mail-Adresse wurde schon stibitzt'});
      }

      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          return done(err);
        }

        const customerCode = uniqid();
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
