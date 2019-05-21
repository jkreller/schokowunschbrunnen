/*Form und Sorte wechseln*/
var Shapes = document.getElementsByClassName('shapeClass');
var Varieties = document.getElementsByClassName('varietyClass');
console.log(Shapes);
var i = 0;
var j = 0;

var shaperadios = document.querySelectorAll('input[type=radio][name="shape"]');
var varietyradios = document.querySelectorAll('input[type=radio][name="variety"]');

var imgshapeandvariety = document.getElementById("shapeAndVariety");
var imgsideview = document.getElementById("side-view");
var imgtopview = document.getElementById("top-view");

function changeShape(event) {
    if ( this.id === 'rectangle' ) {
        for(i=0; i<3; i++){
            Shapes[i].classList.remove('shape2', 'shape3');
            Shapes[i].classList.add('shape1');
        };
        i = 0;
    } else if (this.id === 'heart') {
        for(i=0; i<3; i++){
            Shapes[i].classList.remove('shape1', 'shape3');
            Shapes[i].classList.add('shape2');
        };
        i = 0;
    } else if ( this.id === 'circle' ) {
        for(i=0; i<3; i++){
            Shapes[i].classList.remove('shape1', 'shape2');
            Shapes[i].classList.add('shape3');
        };
        i = 0;
    } 
}
Array.prototype.forEach.call(shaperadios, function(radio) {
    radio.addEventListener('change', changeShape);
});
function changeVariety(event) {
    if ( this.id === 'dark' ) {
        for(j=0; j<3; j++){
            Varieties[j].classList.remove('variety2', 'variety3');
            Varieties[j].classList.add('variety1');
            console.log(Varieties.item(i).classList);
        };
        j = 0;
    } else if (this.id === 'milk') {
        for(j=0; j<3; j++){
            Varieties[j].classList.remove('variety1', 'variety3');
            Varieties[j].classList.add('variety2');
        };
        j = 0;
    } else if ( this.id === 'white' ) {
        for(j=0; j<3; j++){
            Varieties[j].classList.remove('variety1', 'variety2');
            Varieties[j].classList.add('variety3');
        };
        j = 0;
    } 
}
Array.prototype.forEach.call(varietyradios, function(radio) {
    radio.addEventListener('change', changeVariety);
});

/*Creme-Bild wechseln*/
var creamradios = document.querySelectorAll('input[type=radio][name="cream"]');
var imgcream = document.getElementById("cream");

function changeCream(event) {
if (this.id === 'no-cream') {
  imgcream.classList.remove('cream1', 'cream2', 'cream3');
  imgcream.classList.add('cream0');
} else if (this.id === 'pistachio') {
  imgcream.classList.remove('cream0', 'cream2', 'cream3');
  imgcream.classList.add('cream1');
} else if (this.id === 'vanilla') {
  imgcream.classList.remove('cream0', 'cream1', 'cream3');
  imgcream.classList.add('cream2');
} else if (this.id === 'raspberry') {
  imgcream.classList.remove('cream0', 'cream1', 'cream2');
  imgcream.classList.add('cream3');
}
}

Array.prototype.forEach.call(creamradios, function (radio) {
radio.addEventListener('change', changeCream);
});

/*Füllung-Bild wechseln*/
var stuffingradios = document.querySelectorAll('input[type=radio][name="stuffing"]');
var imgstuffing = document.getElementById("stuffing");

function changeStuffing(event) {
if (this.id === 'no-stuffing') {
  imgstuffing.classList.remove('stuffing1', 'stuffing2', 'stuffing3');
  imgstuffing.classList.add('stuffing0');
} else if (this.id === 'blueberry') {
  imgstuffing.classList.remove('stuffing0', 'stuffing2', 'stuffing3');
  imgstuffing.classList.add('stuffing1');
} else if (this.id === 'hazelnut') {
  imgstuffing.classList.remove('stuffing0', 'stuffing1', 'stuffing3');
  imgstuffing.classList.add('stuffing2');
} else if (this.id === 'oreo') {
  imgstuffing.classList.remove('stuffing0', 'stuffing1', 'stuffing2');
  imgstuffing.classList.add('stuffing3');
}
}

Array.prototype.forEach.call(stuffingradios, function (radio) {
radio.addEventListener('change', changeStuffing);
});

/*Topping-Bild wechseln*/
var toppingradios = document.querySelectorAll('input[type=radio][name="topping"]');
var imgtopping = document.getElementById("topping");

function changeTopping(event) {
if (this.id === 'no-topping') {
  imgtopping.classList.remove('topping1', 'topping2', 'topping3');
  imgtopping.classList.add('topping0');
} else if (this.id === 'strawberry') {
  imgtopping.classList.remove('topping0', 'topping2', 'topping3');
  imgtopping.classList.add('topping1');
} else if (this.id === 'smarties') {
  imgtopping.classList.remove('topping0', 'topping1', 'topping3');
  imgtopping.classList.add('topping2');
} else if (this.id === 'gold') {
  imgtopping.classList.remove('topping0', 'topping1', 'topping2');
  imgtopping.classList.add('topping3');
}
}

Array.prototype.forEach.call(toppingradios, function (radio) {
radio.addEventListener('change', changeTopping);
});