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
        var stringParts = [];
        var counter = 0;
        return this.getChocolateByID(id).then(function (chocolate) {

            var promise1 = Shape.findOne({"_id": chocolate.shapeId}).then(function (result, err) {
                if (err) {
                    console.error(err);
                }
                stringParts[0] = result;
                counter++;
            });

            var promise2 = Variety.findOne({"_id": chocolate.varietyId}).then(function (result, err) {
                if (err) {
                    console.error(err);
                }
                stringParts[1] = result;
                counter++;
            });

            var promise3 = Creme.findOne({"_id": chocolate.cremeId}).then(function (result, err) {
                if (err) {
                    console.error(err);
                }
                stringParts[2] = result;
                counter++;
            });

            var promise4 = Filling.findOne({"_id": chocolate.fillingId}).then(function (result, err) {
                if (err) {
                    console.error(err);
                }
                stringParts[3] = result;
                counter++;
            });

            var promise5 = Topping.findOne({"_id": chocolate.toppingId}).then(function (result, err) {
                if (err) {
                    console.error(err);
                }
                stringParts[4] = result;
                counter++;

            });

            return Promise.all([promise1, promise2, promise3, promise4, promise5]).then(function (values) {
                return stringParts;
            });

        });
    },

    getAllChocolatePartsAsArray: function () {

        return this.getShopChocolates().then(function (chocolates) {

            var partArray = [];
            var arrayOfPromise = [];
            var counter = 0;
            chocolates.forEach((chocolate) => {
                arrayOfPromise.push(this.getChocolatePartsAsArray(chocolate._id).then(function (parts) {
                    console.log(parts);
                    partArray[counter] = parts;
                }));
                counter++;
            });
            return Promise.all(arrayOfPromise).then(function () {
                return partArray;
            });
        });
    }
};


module.exports = shopHelper;