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
    Cremes[i].save().catch(console.error);
    Fillings[i].save().catch(console.error);
    Shapes[i].save().catch(console.error);
    Varietys[i].save().catch(console.error);
}


var cremeobject = Creme.findOne({name: 'vanille'});
var varietyobject = Variety.findOne({name: 'zartbitter'});
var shapeobject = Shape.findOne({name: 'kreis'});
var fillingobject = Filling.findOne({name: 'blaubeer'});

var Chocolate1 = new Chocolate({
    shapeId: shapeobject.id,
    varietyId: varietyobject.id,
    cremeId: cremeobject.id,
    fillingId: fillingobject.id,
    selfmadeId: false
});


Chocolate1.save().catch(console.error);