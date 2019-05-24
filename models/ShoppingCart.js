const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    userId: {type: String, required: true},
    chocolateIds: {type: [String], required: true}
});

module.exports = mongoose.model('shoppingCart', schema);