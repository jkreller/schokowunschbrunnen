const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const Chocolate = require('../models/Chocolate');
const Shape = require('../models/Shape');
const Variety = require('../models/Variety');
const Cream = require('../models/Cream');
const Stuffing = require('../models/Stuffing');
const Topping = require('../models/Topping');

const mongoDbDatabase = 'mongodb+srv://admin:Schoko98Wunsch76Brunnen!@schokowunschbrunnen-buupz.mongodb.net/schokowunschbrunnen?retryWrites=true';

const conn = mongoose.connect(mongoDbDatabase, {
    useNewUrlParser: true
});

Chocolate.find({}).then(items => items.forEach((item) => item.remove()));
Shape.find({}).then(items => items.forEach((item) => item.remove()));
Variety.find({}).then(items => items.forEach((item) => item.remove()));
Cream.find({}).then(items => items.forEach((item) => item.remove()));
Stuffing.find({}).then(items => items.forEach((item) => item.remove()));
Topping.find({}).then(items => items.forEach((item) => item.remove()));

const Shapes = [
    new Shape({
        name: 'rectangle',
        price: 1,
        className: 'shape-1'
    }),
    new Shape({
        name: 'heart',
        price: 1,
        className: 'shape-2'
    }),
    new Shape({
        name: 'circle',
        price: 1,
        className: 'shape-3'
    }),
];

const Varieties = [
    new Variety({
        name: 'dark',
        price: 1,
        className: 'variety-1'
    }),
    new Variety({
        name: 'milk',
        price: 1,
        className: 'variety-2'
    }),
    new Variety({
        name: 'white',
        price: 1,
        className: 'variety-3'
    }),
];

const Creams = [
    new Cream({
        name: 'empty',
        price: 0,
        className: 'cream-0'
    }),
    new Cream({
        name: 'pistachio',
        price: 0.65,
        className: 'cream-1'
    }),
    new Cream({
        name: 'vanilla',
        price: 0.45,
        className: 'cream-2'
    }),
    new Cream({
        name: 'raspberry',
        price: 0.55,
        className: 'cream-3'
    })
];

const Stuffings = [
    new Stuffing({
        name: 'empty',
        price: 0,
        className: 'stuffing-0'
    }),
    new Stuffing({
        name: 'blueberry',
        price: 0.55,
        className: 'stuffing-1'
    }),
    new Stuffing({
        name: 'hazelnut',
        price: 0.45,
        className: 'stuffing-2'
    }),
    new Stuffing({
        name: 'oreo',
        price: 0.65,
        className: 'stuffing-3'
    })
];

const Toppings = [
    new Topping({
        name: 'empty',
        price: 0,
        className: 'topping-0'
    }),
    new Topping({
        name: 'strawberry',
        price: 0.55,
        className: 'topping-1'
    }),
    new Topping({
        name: 'smarties',
        price: 0.45,
        className: 'topping-2'
    }),
    new Topping({
        name: 'gold',
        price: 0.65,
        className: 'topping-3'
    }),
];

for (let i = 0; i < 3; i++) {
    Creams[i].save().then(() => console.log('saved cream ' + i));
    Stuffings[i].save().then(() => console.log('saved stuffing ' + i));
    Toppings[i].save().then(() => console.log('saved topping ' + i));

    if (i !== 3) {
        Shapes[i].save().then(() => console.log('saved shape ' + i));
        Varieties[i].save().then(() => console.log('saved variety ' + i));
    }
}

const Chocolates = [
    new Chocolate({
        shape: ObjectId(Shapes[0].id),
        variety: ObjectId(Varieties[2].id),
        cream: ObjectId(Creams[1].id),
        stuffing: ObjectId(Stuffings[3].id),
        topping: ObjectId(Toppings[1].id),
        selfmade: false,
        imageA: '/img/schoko_shop_img/Kombi1_A.png',
        imageB: '/img/schoko_shop_img/Kombi1_B.png',
        price: Shapes[0].price + Varieties[2].price + Creams[1].price + Stuffings[3].price + Toppings[1].price,
    }),
    new Chocolate({
        shape: ObjectId(Shapes[2].id),
        variety: ObjectId(Varieties[0].id),
        cream: ObjectId(Creams[1].id),
        stuffing: ObjectId(Stuffings[1].id),
        topping: ObjectId(Toppings[1].id),
        selfmade: false,
        imageA: '/img/schoko_shop_img/Kombi2_A.png',
        imageB: '/img/schoko_shop_img/Kombi2_B.png',
        price: Shapes[2].price + Varieties[0].price + Creams[1].price + Stuffings[1].price + Toppings[1].price,
    }),
    new Chocolate({
        shape: ObjectId(Shapes[1].id),
        variety: ObjectId(Varieties[1].id),
        cream: ObjectId(Creams[3].id),
        stuffing: ObjectId(Stuffings[2].id),
        topping: ObjectId(Toppings[2].id),
        selfmade: false,
        imageA: '/img/schoko_shop_img/Kombi3_A.png',
        imageB: '/img/schoko_shop_img/Kombi3_B.png',
        price: Shapes[1].price + Varieties[1].price + Creams[3].price + Stuffings[2].price + Toppings[2].price,
    }),
    new Chocolate({
        shape: ObjectId(Shapes[0].id),
        variety: ObjectId(Varieties[0].id),
        cream: ObjectId(Creams[2].id),
        stuffing: ObjectId(Stuffings[1].id),
        topping: ObjectId(Toppings[3].id),
        selfmade: false,
        imageA: '/img/schoko_shop_img/Kombi4_A.png',
        imageB: '/img/schoko_shop_img/Kombi4_B.png',
        price: Shapes[0].price + Varieties[0].price + Creams[1].price + Stuffings[1].price + Toppings[3].price,
    }),
    new Chocolate({
        shape: ObjectId(Shapes[2].id),
        variety: ObjectId(Varieties[1].id),
        cream: ObjectId(Creams[2].id),
        stuffing: ObjectId(Stuffings[2].id),
        topping: ObjectId(Toppings[3].id),
        selfmade: false,
        imageA: '/img/schoko_shop_img/Kombi5_A.png',
        imageB: '/img/schoko_shop_img/Kombi5_B.png',
        price: Shapes[2].price + Varieties[1].price + Creams[2].price + Stuffings[2].price + Toppings[3].price,
    }),
    new Chocolate({
        shape: ObjectId(Shapes[1].id),
        variety: ObjectId(Varieties[2].id),
        cream: ObjectId(Creams[3].id),
        stuffing: ObjectId(Stuffings[3].id),
        topping: ObjectId(Toppings[1].id),
        selfmade: false,
        imageA: '/img/schoko_shop_img/Kombi6_A.png',
        imageB: '/img/schoko_shop_img/Kombi6_B.png',
        price: Shapes[1].price + Varieties[2].price + Creams[3].price + Stuffings[3].price + Toppings[1].price,
    })
];

Chocolates.forEach((chocolate) => {
    chocolate.save();
});