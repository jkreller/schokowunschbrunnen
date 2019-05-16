const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET choco wishing well. */
router.get('/wishing-well', function(req, res, next) {
  res.render('schoko-wunschbrunnen');
});

/* GET choco shop. */
router.get('/shop', function(req, res, next) {
  res.render('schoko-shop');
});

/* GET choco shop product. */
router.get('/shop/:productId', function(req, res, next) {
  res.render('produktseite');
});

/* GET shopping cart. */
router.get('/shopping-cart', function(req, res, next) {
  res.render('warenkorb');
});

module.exports = router;