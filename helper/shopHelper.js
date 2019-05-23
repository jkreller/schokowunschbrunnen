const Chocolate = require('../models/Chocolate');


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

    }


};

module.exports = shopHelper;