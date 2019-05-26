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
router.get('/shop', async function (req, res, next) {
    try {
        const chocolates = await shopHelper.getShopChocolates();
        const chocolatesWithProperties = [];

        for (const chocolate of chocolates) {
            console.log(chocolate);
            chocolatesWithProperties.push(await shopHelper.getChocolateWithProperties(chocolate.id));
        }

        res.render('schoko-shop', {chocolates: chocolatesWithProperties});
    } catch (e) {
        next(e);
    }
});

/* GET choco shop product. */
router.get('/shop/:productId', async function (req, res, next) {
    try {
        const chocolate = await shopHelper.getChocolateWithProperties(req.params.productId);
        res.render('produktseite', {chocolate: chocolate});
    } catch (e) {
        next(e);
    }
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

        res.render('warenkorb', {chocolates: chocolates, totalPriceChocolates: totalPriceChocolates.toFixed(2)});
    } catch (e) {
        next(e);
    }
});

/* POST shopping cart. */
router.post('/shopping-cart', loginHandler.ensureAuthentication, async function (req, res, next) {
    let properties;
    let chocolate;

    const selfmade = req.body.selfmade === '1' ? true : false;

    try {
        if (selfmade) {
            properties = await shopHelper.getPropertyObjects(req.body);
            chocolate = await shopHelper.createChocolateByPropertyObjects(properties);

            chocolate.selfmade = selfmade;

            chocolate.price = 0;
            for (const property in properties) {
                if (properties[property]) {
                    chocolate.price += properties[property].price;
                }
            }
            chocolate.price = chocolate.price.toFixed(2);

            await chocolate.save();
        }
        await ShoppingCart.findOneAndUpdate({_id: req.user._id}, {
            $set: {userId: req.user._id},
            $push: {chocolateIds: selfmade ? chocolate.id : req.body.chocolateId}
        }, {upsert: true, useFindAndModify: false});

        res.redirect('/shopping-cart');
    } catch (e) {
        next(e);
    }
});

router.get('/orderconfirmation', async function (req, res, next) {
    res.render('bestellbestätigung');
});

router.get('/payment', async function (req, res, next) {
    res.render('bezahlmittel');
});


module.exports = router;