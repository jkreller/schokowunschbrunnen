const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    userID: {type: String, required: true},
    chocolateID: { type: [String]}
});

module.exports = mongoose.model('shoppingCart', schema);