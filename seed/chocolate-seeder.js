var Chocolate = require('../models/Chocolate');
var Creme = require('../models/Creme');
var Filling = require('../models/Filling');
var Shape = require('../models/shape');
var Variety = require('../models/Variety');
const mongoose = require('mongoose');

const mongoDbDatabase = 'mongodb+srv://admin:Schoko98Wunsch76Brunnen!@schokowunschbrunnen-buupz.mongodb.net/schokowunschbrunnen?retryWrites=true';

// connect to database
mongoose.connect(mongoDbDatabase, {
    useNewUrlParser: true
}).catch((err) => console.error('Error when connecting to database.'));

var cremes = [
    new Creme({
        name: "pistazie"
    }),
    new Creme({
        name: "himbeer"
    }),
    new Creme({
        name: "vanille"
    })];

var fillings = [
    new Filling({
        name: "blaubeer"
    }),
    new Filling({
        name: "haselnuss"
    }),
    new Filling({
        name: "oreo"
    })];

var shapes = [
    new Shape({
        name: "rechteck"
    }),
    new Shape({
        name: "herz"
    }),
    new Shape({
        name: "kreis"
    })];

var varieties = [
    new Variety({
        name: "zartbitter"
    }),
    new Variety({
        name: "vollmilch"
    }),
    new Variety({
        name: "weiß"
    })];

for(var i = 0; i < cremes.length;i++){

    cremes[i].save();
    fillings[i].save();
    varieties[i].save();
    shapes[i].save();

}

mongoose.disconnect();