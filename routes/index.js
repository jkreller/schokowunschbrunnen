const express = require('express');
const router = express.Router();
const Chocolate = require('../models/Chocolate');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

/* GET choco wishing well. */
router.get('/wishing-well', function (req, res, next) {
    res.render('schoko-wunschbrunnen');
});

/* GET choco shop. */
router.get('/shop', function (req, res, next) {
    Chocolate.find({"selfmade": false}).then(function (chocolates) {
        res.render('schoko-shop', {chocolates: chocolates});
    });
});

/* GET choco shop product. */
router.get('/shop/:productId', function (req, res, next) {
    Chocolate.findOne({'_id': req.params.productId}).then(function (chocolate) {
        res.render('produktseite', {chocolate: chocolate});
    });
});

/* GET shopping cart. */
router.get('/shopping-cart', function (req, res, next) {
    res.render('warenkorb');
});

module.exports = router;