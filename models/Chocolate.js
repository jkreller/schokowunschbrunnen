const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    shapeId: {type: String, required: true},
    varietyId: {type: String, required: true},
    cremeId: {type: String, required: true},
    fillingId: {type: String, required: true},
    toppingId:{type: String, required: true},
    selfmade:{type: Boolean, required: true},
    price:{type: Number, required: true},
    imageA:{type: String},
    imageB:{type: String},
    info:{type: String}
});

module.exports = mongoose.model('Chocolate', schema);