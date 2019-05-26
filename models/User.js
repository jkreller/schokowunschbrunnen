const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const schema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    title: {type: String, enum: ['Herr', 'Frau'], required: true},
    street: {type: String, required: true},
    postcode: {type: String, required: true},
    city: {type: String, required: true},
    birthday: {type: Date, required: true},
});

schema.methods.validPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, res) {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, res);
        }
    });
};

module.exports = mongoose.model('User', schema);