const User = require('../models/User');
const Chocolate = require('../models/Chocolate');
const Cream = require('../models/Cream');
const Shape = require('../models/Shape');
const Variety = require('../models/Variety');
const Stuffing = require('../models/Stuffing');
const Topping = require('../models/Topping');
const ShoppingCart = require('../models/ShoppingCart');

const shopHelper = {
    getShopChocolates: function () {
        return Chocolate.find({selfmade: false}).populate('shape variety cream stuffing topping');
    },

    getPopulatedChocolate: async function (id) {
        return Chocolate.findOne({_id: id}).populate('shape variety cream stuffing topping');
    },

    getPopulatedShoppingCart: async function (userId) {
        return ShoppingCart.findOne({user: userId}).populate({
            path: 'chocolates',
            populate: {path: 'shape variety cream stuffing topping'}
        });
    },

    getPropertyObjects: async function (propertyNames) {
        return {
            shape: await Shape.findOne({'name': propertyNames.shape}),
            variety: await Variety.findOne({'name': propertyNames.variety}),
            cream: await Cream.findOne({'name': propertyNames.cream}),
            stuffing: await Stuffing.findOne({'name': propertyNames.stuffing}),
            topping: await Topping.findOne({'name': propertyNames.topping})
        };
    },

    createChocolateByPropertyObjects: function (propertyObjects) {
        return new Chocolate({
            shape: propertyObjects.shape.id,
            variety: propertyObjects.variety.id,
            cream: propertyObjects.cream ? propertyObjects.cream.id : null,
            stuffing: propertyObjects.stuffing ? propertyObjects.stuffing.id : null,
            topping: propertyObjects.topping ? propertyObjects.topping.id : null
        });
    },

    addToShoppingCart: async function (userId, chocolateObj) {
        let chocolate;

        // if chocolate has no id then create one
        if (!chocolateObj.chocolateId) {
            const properties = await shopHelper.getPropertyObjects(chocolateObj);
            chocolate = shopHelper.createChocolateByPropertyObjects(properties);

            chocolate.selfmade = true;

            chocolate.price = 0;
            for (const property in properties) {
                if (properties[property]) {
                    chocolate.price += properties[property].price;
                }
            }
            chocolate.price = chocolate.price.toFixed(2);

            await chocolate.save();
        }

        return ShoppingCart.findOneAndUpdate({user: userId}, {
            $set: {user: userId},
            $push: {chocolates: chocolateObj.chocolateId || chocolate.id}
        }, {upsert: true, useFindAndModify: false});
    },

    removeFromShoppingCart: async function (chocolateId, userId) {
        const chocolate = await Chocolate.findById(chocolateId);

        if (chocolate.selfmade) {
            await chocolate.remove();
        }

        return ShoppingCart.findOneAndUpdate({user: userId}, {
            $pull: {
                chocolates: chocolateId
            }
        }, {useFindAndModify: false});
    }
};

module.exports = shopHelper;