'use strict';

// Global variables
var chosenProducts = []; // variable to hold the last chosen products
var displayNumber = 3; // how many products to show at one time
var roundsCount = 25; // how many times the user will get a choice of products

// Global DOM variables
var divOneEl = document.getElementById('product1');
var divTwoEl = document.getElementById('product2');
var divThreeEl = document.getElementById('product3');

// Object constructor for products
function Product(filename, id, displayName) {
  this.filename = filename;
  this.filepath = 'assets/' + filename;
  this.id = id;
  this.displayName = displayName;
  this.displayCount = 0;
  this.clickCount = 0;
}

Product.prototype.createImage = function(divDOM) {
  this.displayCount++;
  console.log(this.id + ' display count: ' + this.displayCount);
  var productImageEl = document.createElement('img');
  productImageEl.setAttribute('id', this.id);
  productImageEl.setAttribute('src', this.filepath);
  divDOM.appendChild(productImageEl);
};
Product.prototype.removeImage = function(divDOM) {
  var removeImgEl = document.getElementById(this.id);
  divDOM.removeChild(removeImgEl);
};
Product.prototype.productClick = function(event) {
  event.preventDefault(); // may be default to load page
  event.stopPropagation(); // if not added, could fire event to any ancestor element
  console.log(this.filename);
  this.clickCount++;
  console.log(this.id + ' click count is ' + this.clickCount);
};

// Product template
// var name = new Product('filename', 'id', 'description');

var bag = new Product('bag.jpg', 'bag', 'wheely bag');
var banana = new Product('banana.jpg', 'banana', 'nanner slicer');
var bathroom = new Product('bathroom.jpg', 'bathroom', 'tablet \'n TP');
var boots = new Product('boots.jpg', 'boots', 'toe-free boots');
var breakfast = new Product('breakfast.jpg', 'breakfast', 'breakfast machine');
var bubblegum = new Product('bubblegum.jpg', 'bubblegum', 'meaty chewing gum');
var chair = new Product('chair.jpg', 'chair', 'chair with domed seat');
var cthulhu = new Product('cthulhu.jpg', 'cthulhu', 'tiny cthulhu');
var dogDuck = new Product('dog-duck.jpg', 'dog-duck', 'pup quackers');
var dragon = new Product('dragon.jpg', 'dragon', 'exotic meats: dragon');
var pen = new Product('pen.jpg', 'pen', 'cutlery pens');
var petSweep = new Product('pet-sweep.jpg', 'pet-sweep', 'sweeper slippers for pets');
var scissors = new Product('scissors.jpg', 'scissors', 'pizza sheers');
var shark = new Product('shark.jpg', 'shark', 'shark bag');
var sweep = new Product('sweep.png', 'sweep', 'sweeper onesie');
var tauntaun = new Product('tauntaun.jpg', 'tauntaun', 'tauntaun bag');
var unicorn = new Product('unicorn.jpg', 'unicorn', 'exotic meats: unicorn');
var usb = new Product('usb.gif', 'usb', 'living USB');
var waterCan = new Product('water-can.jpg', 'water-can', 'watering made difficult');
var wineGlass = new Product('wine-glass.jpg', 'wine-glass', 'teetotaler glass');

// Function that chooses random number
function random() {
  return Math.floor(Math.random() * products.length);
}

// Function that chooses 3 random numbers without repeats
function chooseProduct() {
  var product;
  for (var i = 0; i < 3; i++) {
    do {
      product = random();
    }
    while (chosenProducts.includes(product));
    chosenProducts.push(product);
  }
  if (chosenProducts.length > 3) {
    chosenProducts.splice(0,3);
  }
}

// Function that displays objects in DOM
function displayObjects(chosenProductsArray) {
  products[chosenProducts[0]].createImage(divOneEl);
  products[chosenProducts[1]].createImage(divTwoEl);
  products[chosenProducts[2]].createImage(divThreeEl);
}

// // Function that removes imgs from DOM
// function clearObjects(chosenProductsArray) {
//   chosenProductsArray[0].removeImage(divOneEl);
//   chosenProductsArray[1].removeImage(divTwoEl);
//   chosenProductsArray[2].removeImage(divThreeEl);
// }

// Adds event listeners to three divs in user-test.html
divOneEl.addEventListener('click', function() {products[chosenProducts[0]].productClick(event);}, false);
divTwoEl.addEventListener('click', function() {products[chosenProducts[1]].productClick(event);}, false);
divThreeEl.addEventListener('click', function() {products[chosenProducts[2]].productClick(event);}, false);

// Array of all products
var products = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, usb, waterCan, wineGlass]; // all products

// function runTest() {
//   for (var index = 0; index < roundsCount; index++) {
//     chooseProduct();
//     displayObjects(chosenProducts);
//   }
// }
//
// runTest();
