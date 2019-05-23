const Chocolate = require('../models/Chocolate');
const Creme = require('../models/Creme');
const Shape = require('../models/Shape');
const Variety = require('../models/Variety');
const Filling = require('../models/Filling');
const Topping = require('../models/Topping');

const shopHelper = {

    getShopChocolates: function () {
        return Chocolate.find({"selfmade": false}).then(function (result, err) {
            if (err) {
                console.error(err);
            }
            return result;
        });
    },

    getChocolateByID: function (id) {
        return Chocolate.findOne({'_id': id}).then(function (result, err) {
            if (err) {
                console.error(err);
            }
            return result;
        })

    },

    getChocolatePartsAsArray: function (id) {
        this.getChocolateByID(id).then(function (chocolate) {
            var stringParts = [];
            var counter = 0;

            Shape.find({"_id": chocolate.shapeId}).then(function (result, err) {
                if (err) {
                    console.error(err);
                }
                stringParts[0] = result;
                counter++;
            });

            Variety.find({"_id": chocolate.varietyId}).then(function (result, err) {
                if (err) {
                    console.error(err);
                }
                stringParts[1] = result;
                counter++;
            });

            Creme.find({"_id": chocolate.cremeId}).then(function (result, err) {
                if (err) {
                    console.error(err);
                }
                stringParts[2] = result;
                counter++;
            });

            Filling.find({"_id": chocolate.fillingId}).then(function (result, err) {
                if (err) {
                    console.error(err);
                }
                stringParts[3] = result;
                counter++;
            });

            Topping.find({"_id": chocolate.toppingId}).then(function (result, err) {
                if (err) {
                    console.error(err);
                }
                stringParts[4] = result;
                counter++;
            });


        })
    }
};

module.exports = shopHelper;