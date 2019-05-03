var express = require('express');
var router = express.Router();

/* GET login. */
router.get('/login', function(req, res, next) {
  res.render('user/login');
});

/* POST login. */
router.post('/login', function(req, res, next) {
  res.render('user/login');
});

/* GET login. */
router.get('/register', function(req, res, next) {
  res.render('user/register');
});

/* POST login. */
router.post('/register', function(req, res, next) {
  res.render('user/register');
});

module.exports = router;
