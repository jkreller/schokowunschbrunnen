const express = require('express');
const router = express.Router();
const Chocolate = require('../models/Chocolate');
const ShoppingCart = require('../models/ShoppingCart');
const shopHelper = require('../helper/shopHelper');
const loginHandler = require('../middlewares/LoginHandler');

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
router.get('/shop/:productId', async function (req, res, next) {
    const chocolate = await shopHelper.getChocolateWithProperties(req.params.productId);
    res.render('produktseite', {chocolate: chocolate});
});

/* GET shopping cart. */
router.get('/shopping-cart', loginHandler.ensureAuthentication, async function (req, res, next) {
    try {
        const shoppingCart = await ShoppingCart.findOne({userId: req.user._id});
        const chocolates = [];
        let totalPriceChocolates = 0;

        if (shoppingCart) {
            for (const chocolateId of shoppingCart.chocolateIds) {
                const chocolate = await shopHelper.getChocolateWithProperties(chocolateId);
                totalPriceChocolates += chocolate.price;
                chocolates.push(chocolate);
            }
        }

        res.render('warenkorb', {chocolates: chocolates, totalPriceChocolates: totalPriceChocolates});
    } catch (e) {
        next(e);
    }
});

/* POST shopping cart. */
router.post('/shopping-cart', loginHandler.ensureAuthentication, async function (req, res, next) {
    let properties;
    let chocolate;

    try {
        properties = await shopHelper.getPropertyObjects(req.body);
        chocolate = await shopHelper.createChocolateByPropertyObjects(properties);

        if (req.body.selfmade) {
            chocolate.selfmade = true;
        } else {
            chocolate.selfmade = false;
        }

        chocolate.price = 0;
        for (const property in properties) {
            if (properties[property]) {
                chocolate.price += properties[property].price;
            }
        }
        chocolate.price = chocolate.price.toFixed(2);

        await chocolate.save();

        await ShoppingCart.findOneAndUpdate({_id: req.user._id}, {
            $set: {userId: req.user._id},
            $push: {chocolateIds: chocolate.id}
        }, {upsert: true, useFindAndModify: false});

        res.redirect('/shopping-cart');
    } catch (e) {
        next(e);
    }
});

module.exports = router;