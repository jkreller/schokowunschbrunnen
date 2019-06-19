const Chocolate = require('../models/Chocolate');
const Cream = require('../models/Cream');
const Shape = require('../models/Shape');
const Variety = require('../models/Variety');
const Stuffing = require('../models/Stuffing');
const Topping = require('../models/Topping');
const ShoppingCart = require('../models/ShoppingCart');

/**
 * ChocolateHelper:
 *
 * Contains various functions for operating with chocolates. For example provides database queries and processing functions.
 *
 * @type {{getShopChocolates: (function(): (Promise|Query|Document|*|void)), getPopulatedChocolate: (function(*=): (Promise|Query|Document|*|void)), getPopulatedShoppingCart: (function(*=): (Promise|Query|Document|*|void)), getPropertyObjects: (function(*): {shape: *, variety: *, cream: *, stuffing: *, topping: *}), createChocolateByPropertyObjects: (function(*): *), addToShoppingCart: (function(*=, *=): *), removeFromShoppingCart: (function(*=, *=): *), removeAllFromShoppingCart: (function(*=): *)}}
 */
const chocolateHelper = {
    /**
     * GetShopChocolates
     *
     * Returning the shop chocolates from data base.
     *
     * @returns {Promise<Chocolate[]>}
     */
    getShopChocolates: async function () {
        return Chocolate.find({selfmade: false}).populate('shape variety cream stuffing topping');
    },

    /**
     * GetPopulatedChocolate
     *
     * Puts the chocolate parts together in one object to work with.
     *
     * @param id
     * @returns {Promise<Chocolate>}
     */
    getPopulatedChocolate: async function (id) {
        return Chocolate.findOne({_id: id}).populate('shape variety cream stuffing topping');
    },

    /**
     * GetPopulatedShoppingCart
     *
     * Puts the chocolates together in one Shoppingcart-object to work with.
     *
     * @param userId
     * @returns {Promise<ShoppingCart>}
     */
    getPopulatedShoppingCart: async function (userId) {
        return ShoppingCart.findOne({user: userId}).populate({
            path: 'chocolates',
            populate: {path: 'shape variety cream stuffing topping'}
        });
    },

    /**
     * GetPropertyObjects
     *
     * Returns a property-object containing all of the chocolate parts.
     *
     * @param propertyNames
     * @returns {Promise<{shape: Shape, variety: Variety, cream: Cream, stuffing: Stuffing, topping: Topping}>}
     */
    getPropertyObjects: async function (propertyNames) {
        return {
            shape: await Shape.findOne({'name': propertyNames.shape}),
            variety: await Variety.findOne({'name': propertyNames.variety}),
            cream: await Cream.findOne({'name': propertyNames.cream}),
            stuffing: await Stuffing.findOne({'name': propertyNames.stuffing}),
            topping: await Topping.findOne({'name': propertyNames.topping})
        };
    },

    /**
     * CreateChocolateByPropertyObjects
     *
     * Creates a Chocolates from the propertyObjects containing all of its parts.
     *
     * @param propertyObjects
     * @returns {Chocolate}
     */
    createChocolateByPropertyObjects: function (propertyObjects) {
        return new Chocolate({
            shape: propertyObjects.shape.id,
            variety: propertyObjects.variety.id,
            cream: propertyObjects.cream ? propertyObjects.cream.id : null,
            stuffing: propertyObjects.stuffing ? propertyObjects.stuffing.id : null,
            topping: propertyObjects.topping ? propertyObjects.topping.id : null
        });
    },

    /**
     * AddToShoppingCart:
     *
     * Adds a chocolateObject to the ShoppingCard of an user.
     *
     * @param userId
     * @param chocolateObj
     * @returns {Promise<ShoppingCart>}
     */
    addToShoppingCart: async function (userId, chocolateObj) {
        let chocolate;

        // If chocolate has no id then create one
        if (!chocolateObj.chocolateId) {
            const properties = await chocolateHelper.getPropertyObjects(chocolateObj);
            chocolate = chocolateHelper.createChocolateByPropertyObjects(properties);

            chocolate.selfmade = true;

            // Calculate chocolate price
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

    /**
     * RemoveFromShoppingCart:
     *
     * Removes a chocolate from a shoppingCard of an user.
     *
     * @param chocolateId
     * @param userId
     * @returns {Promise<ShoppingCart>}
     */
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
    },

    /**
     * RemoveAllFromShoppingCart:
     *
     * Removes all of the chocolates from a shoppingCard of a specific user.
     *
     * @param userId
     * @returns {Promise<*>}
     */
    removeAllFromShoppingCart: async function (userId) {
        const shoppingCart = await ShoppingCart.findOne({'user': userId});
        return shoppingCart.remove();
    }


};

module.exports = chocolateHelper;