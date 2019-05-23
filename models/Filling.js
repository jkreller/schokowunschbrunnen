const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    imagePath: {type: String, required: true}
});

module.exports = mongoose.model('Filling', schema);
