const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    shapeId: {type: String, required: true},
    varietyId: {type: String, required: true},
    cremeId: {type: String, required: true},
    fillingId: {type: String, required: true},
    selfmadeId:{type: Boolean, required: true}
});

module.exports = mongoose.model('Chocolate', schema);