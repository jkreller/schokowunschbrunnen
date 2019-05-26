const express = require('express');
const router = express.Router();
const Chocolate = require('../models/Chocolate');
const ShoppingCart = require('../models/ShoppingCart');
const shopHelper = require('../helper/shopHelper');
const loginHandler = require('../middlewares/LoginHandler');
const ObjectId = require('mongoose').Types.ObjectId;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

/* GET choco wishing well. */
router.get('/wishing-well', function (req, res, next) {
    res.render('schoko-wunschbrunnen');
});

/* GET choco shop. */
router.get('/shop', async function (req, res, next) {
    try {
        const chocolates = await shopHelper.getShopChocolates();
        res.render('schoko-shop', {chocolates: chocolates});
    } catch (e) {
        next(e);
    }
});

/* GET choco shop product. */
router.get('/shop/:productId', async function (req, res, next) {
    try {
        const chocolate = await shopHelper.getPopulatedChocolate(req.params.productId);
        res.render('produktseite', {chocolate: chocolate});
    } catch (e) {
        next(e);
    }
});

/* GET shopping cart. */
router.get('/shopping-cart', loginHandler.ensureAuthentication, async function (req, res, next) {
    try {
        const shoppingCart = await shopHelper.getPopulatedShoppingCart(req.user._id);
        let totalPriceChocolates = 0;

        if (shoppingCart) {
            shoppingCart.chocolates.forEach(chocolate => totalPriceChocolates += chocolate.price);
        }

        res.render('warenkorb', {
            chocolates: shoppingCart ? shoppingCart.chocolates : [],
            totalPriceChocolates: totalPriceChocolates.toFixed(2)
        });
    } catch (e) {
        next(e);
    }
});

/* POST shopping cart. */
router.post('/shopping-cart', loginHandler.ensureAuthentication, async function (req, res, next) {
    try {
        await shopHelper.addToShoppingCart(req.user._id, req.body);
        res.redirect('/shopping-cart');
    } catch (e) {
        next(e);
    }
});

/* GET remove shopping cart product. */
router.get('/shopping-cart/remove/:productId', loginHandler.ensureAuthentication, async function (req, res, next) {
    try {
        await shopHelper.removeFromShoppingCart(req.params.productId, req.user._id);
        res.redirect('/shopping-cart');
    } catch (e) {
        next(e);
    }
});

module.exports = router;