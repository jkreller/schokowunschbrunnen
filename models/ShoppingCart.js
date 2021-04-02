const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Mongoose database schema for shopping carts
 *
 * @namespace ShoppingCart
 */
const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    chocolates: [{type: Schema.Types.ObjectId, ref: 'Chocolate', required: true}]
});

module.exports = mongoose.model('shoppingCart', schema);