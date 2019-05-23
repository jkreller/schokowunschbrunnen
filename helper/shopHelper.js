const Chocolate = require('../models/Chocolate');


const shopHelper = {

    getShopChocolate: function () {
        return Chocolate.find({"selfmade": false}).then(function (result, err) {
            if (err) {
                console.error(err);
            }
            return result;
        });
    },

};

module.exports = shopHelper;