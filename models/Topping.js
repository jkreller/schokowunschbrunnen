const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Mongoose database schema for toppings
 */
const schema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    className: {type: String, required: true},
});

module.exports = mongoose.model('Topping', schema);
