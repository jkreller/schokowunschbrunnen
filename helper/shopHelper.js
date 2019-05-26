const User = require('../models/User');
const Chocolate = require('../models/Chocolate');
const Creme = require('../models/Creme');
const Shape = require('../models/Shape');
const Variety = require('../models/Variety');
const Filling = require('../models/Filling');
const Topping = require('../models/Topping');
const ShoppingCart = require('../models/ShoppingCart');

const shopHelper = {

    getShopChocolates: function () {
        return Chocolate.find({selfmade: false}).populate('shape variety creme filling topping');
    },

    getPopulatedChocolate: async function (id) {
        return Chocolate.findOne({_id: id}).populate('shape variety creme filling topping');
    },

    getPopulatedShoppingCart: async function (userId) {
        return ShoppingCart.findOne({user: userId}).populate({path : 'chocolates', populate : {path: 'shape variety creme filling topping'}});
    },

    getPropertyObjects: async function (propertyNames) {
        return {
            shape: await Shape.findOne({'name': propertyNames.shape}),
            variety: await Variety.findOne({'name': propertyNames.variety}),
            cream: await Creme.findOne({'name': propertyNames.cream}),
            stuffing: await Filling.findOne({'name': propertyNames.stuffing}),
            topping: await Topping.findOne({'name': propertyNames.topping})
        };
    },

    createChocolateByPropertyObjects: async function (propertyObjects) {
        return new Chocolate({
            shape: propertyObjects.shape.id,
            variety: propertyObjects.variety.id,
            creme: propertyObjects.cream ? propertyObjects.cream.id : null,
            filling: propertyObjects.stuffing ? propertyObjects.stuffing.id : null,
            topping: propertyObjects.topping ? propertyObjects.topping.id : null
        });
    }
}

module.exports = shopHelper;