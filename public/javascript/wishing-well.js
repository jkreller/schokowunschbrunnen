/*Form und Sorte wechseln*/
var Shapes = document.getElementsByClassName('shapeClass');
var Varieties = document.getElementsByClassName('varietyClass');

var ZusammenfassungFormSorte = document.getElementById('zusammenfassung-form-sorte').getElementsByClassName('category-icon');
var ZusammenfassungCremeFüllung = document.getElementById('zusammenfassung-creme-füllung').getElementsByClassName('category-icon');
var ZusammenfassungTopping = document.getElementById('zusammenfassung-topping').getElementsByClassName('category-icon');

var i = 0;
var j = 0;

var shaperadios = document.querySelectorAll('input[type=radio][name="shape"]');
var varietyradios = document.querySelectorAll('input[type=radio][name="variety"]');
var creamradios = document.querySelectorAll('input[type=radio][name="cream"]');
var stuffingradios = document.querySelectorAll('input[type=radio][name="stuffing"]');
var toppingradios = document.querySelectorAll('input[type=radio][name="topping"]');

var imgshapeandvariety = document.getElementById("shapeAndVariety");
var imgcream = document.getElementById("cream");
var imgstuffing = document.getElementById("stuffing");
var imgtopping = document.getElementById("topping");

var imgsideview = document.getElementById("side-view");
var imgtopview = document.getElementById("top-view");

var totalPriceField = document.getElementById("totalprice");
var creamPriceField = document.getElementById("creamprice");
var stuffingPriceField = document.getElementById("stuffingprice");
var toppingPriceField = document.getElementById("toppingprice");

console.log(creamPriceField.innerText);

var totalPrice = 1.00;
var creamPrice = 0.00;
var stuffingPrice = 0.00;
var toppingPrice = 0.00;

// the function changeShape 
function changeShape(event) {
    if ( this.id === 'rectangle' ) {
        for(i=0; i<3; i++){
            Shapes[i].classList.remove('shape2', 'shape3');
            Shapes[i].classList.add('shape1');
        };
        ZusammenfassungFormSorte[0].classList.remove('shape-2', 'shape-3');
        ZusammenfassungFormSorte[0].classList.add('shape-1');
        i = 0;
    } else if (this.id === 'heart') {
        for(i=0; i<3; i++){
            Shapes[i].classList.remove('shape1', 'shape3');
            Shapes[i].classList.add('shape2');
        };
        ZusammenfassungFormSorte[0].classList.remove('shape-1', 'shape-3');
        ZusammenfassungFormSorte[0].classList.add('shape-2');
        i = 0;
    } else if ( this.id === 'circle' ) {
        for(i=0; i<3; i++){
            Shapes[i].classList.remove('shape1', 'shape2');
            Shapes[i].classList.add('shape3');
        };
        ZusammenfassungFormSorte[0].classList.remove('shape-1', 'shape-2');
        ZusammenfassungFormSorte[0].classList.add('shape-3');
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
        ZusammenfassungFormSorte[1].classList.remove('variety-2', 'variety-3');
        ZusammenfassungFormSorte[1].classList.add('variety-1');
        j = 0;
    } else if (this.id === 'milk') {
        for(j=0; j<3; j++){
            Varieties[j].classList.remove('variety1', 'variety3');
            Varieties[j].classList.add('variety2');
        };
        ZusammenfassungFormSorte[1].classList.remove('variety-1', 'variety-3');
        ZusammenfassungFormSorte[1].classList.add('variety-2');
        j = 0;
    } else if ( this.id === 'white' ) {
        for(j=0; j<3; j++){
            Varieties[j].classList.remove('variety1', 'variety2');
            Varieties[j].classList.add('variety3');
        };
        ZusammenfassungFormSorte[1].classList.remove('variety-1', 'variety-2');
        ZusammenfassungFormSorte[1].classList.add('variety-3');
        j = 0;
    } 
}
Array.prototype.forEach.call(varietyradios, function(radio) {
    radio.addEventListener('change', changeVariety);
});

/*Creme-Bild wechseln*/
function changeCream(event) {
    if (this.id === 'no-cream') {
    imgcream.classList.remove('cream1', 'cream2', 'cream3');
    imgcream.classList.add('cream0');
    ZusammenfassungCremeFüllung[0].classList.remove('cream-1', 'cream-2', 'cream-3');
    ZusammenfassungCremeFüllung[0].classList.add('cream-0');
    creamPrice = 0.00;
    } else if (this.id === 'pistachio') {
    imgcream.classList.remove('cream0', 'cream2', 'cream3');
    imgcream.classList.add('cream1');
    ZusammenfassungCremeFüllung[0].classList.remove('cream-0', 'cream-2', 'cream-3');
    ZusammenfassungCremeFüllung[0].classList.add('cream-1');
    creamPrice = 0.65;
    } else if (this.id === 'vanilla') {
    imgcream.classList.remove('cream0', 'cream1', 'cream3');
    imgcream.classList.add('cream2');
    ZusammenfassungCremeFüllung[0].classList.remove('cream-0', 'cream-1', 'cream-3');
    ZusammenfassungCremeFüllung[0].classList.add('cream-2');
    creamPrice = 0.45;
    } else if (this.id === 'raspberry') {
    imgcream.classList.remove('cream0', 'cream1', 'cream2');
    imgcream.classList.add('cream3');
    ZusammenfassungCremeFüllung[0].classList.remove('cream-0', 'cream-1', 'cream-2');
    ZusammenfassungCremeFüllung[0].classList.add('cream-3');
    creamPrice = 0.55;
    }
    creamPriceField.innerText = creamPrice.toFixed(2).replace('.',',');
}
Array.prototype.forEach.call(creamradios, function (radio) {
radio.addEventListener('change', changeCream);
});

/*Füllung-Bild wechseln*/
function changeStuffing(event) {
    if (this.id === 'no-stuffing') {
        imgstuffing.classList.remove('stuffing1', 'stuffing2', 'stuffing3');
        imgstuffing.classList.add('stuffing0');
        ZusammenfassungCremeFüllung[1].classList.remove('stuffing-1', 'stuffing-2', 'stuffing-3');
        ZusammenfassungCremeFüllung[1].classList.add('stuffing-0');
        stuffingPrice = 0.00;
    } else if (this.id === 'blueberry') {
        imgstuffing.classList.remove('stuffing0', 'stuffing2', 'stuffing3');
        imgstuffing.classList.add('stuffing1');
        ZusammenfassungCremeFüllung[1].classList.remove('stuffing-0', 'stuffing-2', 'stuffing-3');
        ZusammenfassungCremeFüllung[1].classList.add('stuffing-1');
        stuffingPrice = 0.55;
    } else if (this.id === 'hazelnut') {
        imgstuffing.classList.remove('stuffing0', 'stuffing1', 'stuffing3');
        imgstuffing.classList.add('stuffing2');
        ZusammenfassungCremeFüllung[1].classList.remove('stuffing-0', 'stuffing-1', 'stuffing-3');
        ZusammenfassungCremeFüllung[1].classList.add('stuffing-2');
        stuffingPrice = 0.45;
    } else if (this.id === 'oreo') {
        imgstuffing.classList.remove('stuffing0', 'stuffing1', 'stuffing2');
        imgstuffing.classList.add('stuffing3');
        ZusammenfassungCremeFüllung[1].classList.remove('stuffing-0', 'stuffing-1', 'stuffing-2');
        ZusammenfassungCremeFüllung[1].classList.add('stuffing-3');
        stuffingPrice = 0.65;
    }
    stuffingPriceField.innerText = stuffingPrice.toFixed(2).replace('.',',');
}
Array.prototype.forEach.call(stuffingradios, function (radio) {
radio.addEventListener('change', changeStuffing);
});

/*Topping-Bild wechseln*/
function changeTopping(event) {
    if (this.id === 'no-topping') {
        imgtopping.classList.remove('topping1', 'topping2', 'topping3');
        imgtopping.classList.add('topping0');
        ZusammenfassungTopping[0].classList.remove('topping-1', 'topping-2', 'topping-3');
        ZusammenfassungTopping[0].classList.add('topping-0');
        toppingPrice = 0.00;
    } else if (this.id === 'strawberry') {
        imgtopping.classList.remove('topping0', 'topping2', 'topping3');
        imgtopping.classList.add('topping1');
        ZusammenfassungTopping[0].classList.remove('topping-0', 'topping-2', 'topping-3');
        ZusammenfassungTopping[0].classList.add('topping-1');
        toppingPrice = 0.55;
    } else if (this.id === 'smarties') {
        imgtopping.classList.remove('topping0', 'topping1', 'topping3');
        imgtopping.classList.add('topping2');
        ZusammenfassungTopping[0].classList.remove('topping-0', 'topping-1', 'topping-3');
        ZusammenfassungTopping[0].classList.add('topping-2');
        toppingPrice = 0.45;
    } else if (this.id === 'gold') {
        imgtopping.classList.remove('topping0', 'topping1', 'topping2');
        imgtopping.classList.add('topping3');
        ZusammenfassungTopping[0].classList.remove('topping-0', 'topping-1', 'topping-2');
        ZusammenfassungTopping[0].classList.add('topping-3');
        toppingPrice = 0.65;
    }
    toppingPriceField.innerText = toppingPrice.toFixed(2).replace('.',',');
}
Array.prototype.forEach.call(toppingradios, function (radio) {
radio.addEventListener('change', changeTopping);
});

function calculateTotalPrice(event) {
    totalPrice = 1.00 + creamPrice + stuffingPrice + toppingPrice;
    totalPriceField.innerText = totalPrice.toFixed(2).replace('.',',');
}
document.getElementById("calculate").addEventListener('click', calculateTotalPrice);
