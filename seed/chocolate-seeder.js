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

var Cremes = [
    new Creme({
        name: 'pistazie'
    }),
    new Creme({
        name: 'himbeer'
    }),
    new Creme({
        name: 'vanille'
    })
];

var Fillings = [
    new Filling({
        name: 'blaubeer'
    }),
    new Filling({
        name: 'haselnuss'
    }),
    new Filling({
        name: 'oreo'
    })
];

var Shapes = [
    new Shape({
        name: 'rechteck'
    }),
    new Shape({
        name: 'herz'
    }),
    new Shape({
        name: 'kreis'
    })
];

var Varietys = [
    new Variety({
        name: 'zartbitter'
    }),
    new Variety({
        name: 'vollmilch'
    }),
    new Variety({
        name: 'weiß'
    })
];

for (var i = 0; i < Creme.length; i++) {

    Cremes[i].save();
    Fillings[i].save();
    Shapes[i].save();
    Varietys[i].save();
}


var cremeobject = Creme.find({name: 'vanille'});
var varietyobject = Variety.find({name: 'zartbitter'});
var shapeobject = Shape.find({name: 'kreis'});
var fillingobject = Filling.find({name: 'blaubeer'});

var Chocolate1;
Chocolate1 = new Chocolate({
    shapeId: shapeobject,
    varietyId: varietyobject,
    cremeId: cremeobject,
    fillingId: fillingobject,
    selfmadeId: false
});


Chocolate1.save();




