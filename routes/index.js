/**
 * In this file the express router functions get/post are called
 *
 * @namespace IndexRoute
 * @type {createApplication}
 */

const express = require('express');
const router = express.Router();
const chocolateHelper = require('../helper/chocolateHelper');
const loginHandler = require('../middlewares/LoginHandler');

/**
 * GET home page.
 */
router.get('/',
    /**
     * Home page (GET)
     *
     * @callback getHomepage
     * @memberOf IndexRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    function (req, res, next) {
    res.render('index');
});

/**
 * GET chocolate wishing well.
 */
router.get('/wishing-well',
    /**
     * Wishing Well (GET)
     *
     * @callback getWishingWell
     * @memberOf IndexRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    function (req, res, next) {
    res.render('wishing-well');
});

/**
 * GET chocolate shop.
 */
router.get('/shop',
    /**
     * Chocolate Shop (GET)
     *
     * @callback getChocolateShop
     * @memberOf IndexRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    async function (req, res, next) {
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
router.get('/shop/:productId',
    /**
     * Chocolate Shop Product (GET)
     *
     * @callback getChocolateShopProduct
     * @memberOf IndexRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    async function (req, res, next) {
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
router.get('/shopping-cart', loginHandler.ensureAuthentication,
    /**
     * Shopping Cart (GET)
     *
     * @callback getShoppingCart
     * @memberOf IndexRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    async function (req, res, next) {
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
router.post('/shopping-cart',loginHandler.ensureAuthentication,
    /**
     * Shopping Cart (POST)
     *
     * @callback postShoppingCart
     * @memberOf IndexRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    async function (req, res, next) {
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
router.get('/shopping-cart/remove/:productId', loginHandler.ensureAuthentication,
    /**
     * Remove from Shopping Cart (GET)
     *
     * @callback getRemoveFromShoppingCart
     * @memberOf IndexRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    async function (req, res, next) {
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
router.get('/order-confirmation', loginHandler.ensureAuthentication,
    /**
     * Order Confirmation (GET)
     *
     * @callback getOrderConfirmation
     * @memberOf IndexRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    async function (req, res, next) {
    chocolateHelper.removeAllFromShoppingCart(req.user._id);
    res.render('order-confirmation');
});

/**
 * GET payment overview.
 */
router.get('/payment',
    /**
     * Payment (GET)
     *
     * @callback getPayment
     * @memberOf IndexRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    async function (req, res, next) {
    res.render('payment');
});

/**
 * GET legal notice.
 */
router.get('/legal-notice',
    /**
     * Legal Notice (GET)
     *
     * @callback getLegalNotice
     * @memberOf IndexRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    async function (req, res, next) {
    res.render('legal-notice');
});

/**
 * GET privacy policy.
 */
router.get('/privacy-policy',
    /**
     * Privacy Policy (GET)
     *
     * @callback getPrivacyPolicy
     * @memberOf IndexRoute
     * @param req {Request} Express.js request object
     * @param res {Response} Express.js response object
     * @param next {Function} Express.js callback
     */
    async function (req, res, next) {
    res.render('privacy-policy');
});

module.exports = router;