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
 * GET chocolate wishing well.
 */
router.get('/wishing-well', function (req, res, next) {
    res.render('wishing-well');
});

/**
 * GET chocolate shop.
 */
router.get('/shop', async function (req, res, next) {
    try {
        const chocolates = await chocolateHelper.getShopChocolates();
        res.render('shop', {chocolates: chocolates});
    } catch (e) {
        next(e);
    }
});

/**
 * GET chocolate shop product.
 */
router.get('/shop/:productId', async function (req, res, next) {
    try {
        const chocolate = await chocolateHelper.getPopulatedChocolate(req.params.productId);
        res.render('product-details', {chocolate: chocolate});
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

        res.render('shopping-cart', {
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
router.get('/order-confirmation', loginHandler.ensureAuthentication, async function (req, res, next) {
    chocolateHelper.removeAllFromShoppingCart(req.user._id);
    res.render('order-confirmation');
});

/**
 * GET payment overview.
 */
router.get('/payment', async function (req, res, next) {
    res.render('payment');
});

/**
 * GET legal notice.
 */
router.get('/legal-notice', async function (req, res, next) {
    res.render('legal-notice');
});

/**
 * GET privacy policy.
 */
router.get('/privacy-policy', async function (req, res, next) {
    res.render('privacy-policy');
});

module.exports = router;