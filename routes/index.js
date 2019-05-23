const express = require('express');
const router = express.Router();
const Chocolate = require('../models/Chocolate');
const shopHelper = require('../helper/shopHelper');

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
    shopHelper.getShopChocolates().then(function (chocolates) {
        res.render('schoko-shop', {chocolates: chocolates});
    });
});

/* GET choco shop product. */
router.get('/shop/:productId', function (req, res, next) {
  shopHelper.getChocolateByID(req.params.productId).then(function (chocolate) {
      shopHelper.getChocolatePartsAsArray(req.params.productId).then(function (result) {
          console.log("fefe"+result);
          res.render('produktseite', {chocolate: chocolate});
      });

  });
});

/* GET shopping cart. */
router.get('/shopping-cart', function (req, res, next) {
  res.render('warenkorb');
});

module.exports = router;