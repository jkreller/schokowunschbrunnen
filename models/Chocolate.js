const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    shape: {type: Schema.Types.ObjectId, ref: 'Shape', required: true},
    variety: {type: Schema.Types.ObjectId, ref: 'Variety', required: true},
    creme: {type: Schema.Types.ObjectId, ref: 'Creme'},
    filling: {type: Schema.Types.ObjectId, ref: 'Filling'},
    topping: {type: Schema.Types.ObjectId, ref: 'Topping'},
    selfmade: {type: Boolean, required: true},
    price: {type: Number, required: true},
    imageA: {type: String},
    imageB: {type: String},
    info: {type: String}
});

module.exports = mongoose.model('Chocolate', schema);