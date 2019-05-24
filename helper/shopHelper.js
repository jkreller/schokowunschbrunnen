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
        return Chocolate.findOne({_id: id}).then(function (result, err) {
            if (err) {
                console.error(err);
            }
            return result;
        })
    },

    getChocolateWithProperties: async function (id) {
        const chocolate = (await this.getChocolateByID(id)).toObject();

        chocolate.shape = await Shape.findOne({"_id": chocolate.shapeId});
        delete chocolate.shapeId;
        chocolate.variety = await Variety.findOne({"_id": chocolate.varietyId});
        delete chocolate.varietyId;
        chocolate.creme = await Creme.findOne({"_id": chocolate.cremeId});
        delete chocolate.cremeId;
        chocolate.filling = await Filling.findOne({"_id": chocolate.fillingId});
        delete chocolate.fillingId;
        chocolate.topping = await Topping.findOne({"_id": chocolate.toppingId});
        delete chocolate.toppingId;

        return chocolate;
    },

    async getPropertyObjects(propertyNames) {
        return {
            shape: await Shape.findOne({'name': propertyNames.shape}),
            variety: await Variety.findOne({'name': propertyNames.variety}),
            cream: await Creme.findOne({'name': propertyNames.cream}),
            stuffing: await Filling.findOne({'name': propertyNames.stuffing}),
            topping: await Topping.findOne({'name': propertyNames.topping})
        };
    },

    async createChocolateByPropertyObjects(propertyObjects) {
        return new Chocolate({
            shapeId: propertyObjects.shape.id,
            varietyId: propertyObjects.variety.id,
            cremeId: propertyObjects.cream ? propertyObjects.cream.id : null,
            fillingId: propertyObjects.stuffing ? propertyObjects.stuffing.id : null,
            toppingId: propertyObjects.topping ? propertyObjects.topping.id : null
        });
    }
};

module.exports = shopHelper;