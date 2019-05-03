const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const schema = new Schema({
    shape: {type: String, required: true},
    variety: {type: String, required: true},
    creme: {type: String, required: true},
    filling: {type: String, required: true},
    selfmade:{type: Boolean, required: true}
});

module.exports = mongoose.model('user', schema);