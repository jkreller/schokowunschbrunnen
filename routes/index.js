const express = require('express');
const router = express.Router();
const chocolateHelper = require('../helper/chocolateHelper');
const loginHandler = require('../middlewares/LoginHandler');

/**
 * GET home page.
 */
router.get('/', function (req, res, next) {
    res.render('index');
});

/**
 * GET choco wishing well.
 */
router.get('/wishing-well', function (req, res, next) {
    res.render('schoko-wunschbrunnen');
});

/**
 * GET choco shop.
 */
router.get('/shop', async function (req, res, next) {
    try {
        const chocolates = await chocolateHelper.getShopChocolates();
        res.render('schoko-shop', {chocolates: chocolates});
    } catch (e) {
        next(e);
    }
});

/**
 * GET choco shop product.
 */
router.get('/shop/:productId', async function (req, res, next) {
    try {
        const chocolate = await chocolateHelper.getPopulatedChocolate(req.params.productId);
        res.render('produktseite', {chocolate: chocolate});
    } catch (e) {
        next(e);
    }
});

/**
 * GET shopping cart.
 */
router.get('/shopping-cart', loginHandler.ensureAuthentication, async function (req, res, next) {
    try {
        const shoppingCart = await chocolateHelper.getPopulatedShoppingCart(req.user._id);
        let totalPriceChocolates = 0;

        // Calculate total chocolate price
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

/**
 * POST shopping cart.
 */
router.post('/shopping-cart', loginHandler.ensureAuthentication, async function (req, res, next) {
    try {
        await chocolateHelper.addToShoppingCart(req.user._id, req.body);
        res.redirect('/shopping-cart');
    } catch (e) {
        next(e);
    }
});

/**
 * GET remove shopping cart product.
 */
router.get('/shopping-cart/remove/:productId', loginHandler.ensureAuthentication, async function (req, res, next) {
    try {
        await chocolateHelper.removeFromShoppingCart(req.params.productId, req.user._id);
        res.redirect('/shopping-cart');
    } catch (e) {
        next(e);
    }
});

/**
 * GET order confirmation.
 */
router.get('/orderconfirmation', async function (req, res, next) {
    chocolateHelper.removeAllFromShoppingCart(req.user._id);
    res.render('bestellbestätigung');
});

/**
 * GET payment overview.
 */
router.get('/payment', async function (req, res, next) {
    res.render('bezahlmittel');
});

module.exports = router;

