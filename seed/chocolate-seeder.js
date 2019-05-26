var Chocolate = require('../models/Chocolate');
var Creme = require('../models/Creme');
var Filling = require('../models/Filling');
var Shape = require('../models/Shape');
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

var cremeobject;
var varietyobject;
var shapeobject;
var fillingobject;

Creme.findOne({name: 'vanille'}).then(function (object) {
    cremeobject = object;

    Variety.findOne({name: 'zartbitter'}).then(function (object) {
        varietyobject = object;

        Shape.findOne({name: 'kreis'}).then(function (object) {
            shapeobject = object;

            Filling.findOne({name: 'blaubeer'}).then(function (object) {
                fillingobject = object;


                var Chocolate1 = new Chocolate({
                    shape: shapeobject.id,
                    variety: varietyobject.id,
                    creme: cremeobject.id,
                    filling: fillingobject.id,
                    selfmade: false
                });

                Chocolate1.save().catch(console.error);


            });

        });

    });

});





