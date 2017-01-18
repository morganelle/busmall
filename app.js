'use strict';

// Global variables
var chosenProducts = []; // variable to hold the last chosen products
var displayNumber = 3; // how many products to show at one time
var roundsCount = 25; // how many times the user will get a choice of products

// Global DOM variables
var userChoiceSectionEl = document.getElementById('user-choice');

// Object constructor for products
function Product(filename, id, displayName) {
  this.filename = filename;
  this.filepath = 'assets/' + filename;
  this.id = id;
  this.displayName = displayName;
  this.displayCount = 0;
  this.clickCount = 0;
}

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
var scissors = new Product('scissors.png', 'scissors', 'pizza sheers');
var shark = new Product('shark.jpg', 'shark', 'shark bag');
var sweep = new Product('sweep.png', 'sweep', 'sweeper onesie');
var tauntaun = new Product('tauntaun.jpg', 'tauntaun', 'tauntaun bag');
var unicorn = new Product('unicorn.jpg', 'unicorn', 'exotic meats: unicorn');
var usb = new Product('usb.gif', 'usb', 'living USB');
var waterCan = new Product('water-can.jpg', 'water-can', 'watering made difficult');
var wineGlass = new Product('wine-glass.jpg', 'wine-glass', 'teetotaler glass');

// Function that chooses random number
function random(array) {
  return Math.floor(Math.random() * array.length);
}

// Function to add back in products selected 2 times ago
function addBackProducts(chosenProducts) {
  if (chosenProducts.length > 0) {
    products = products.concat(chosenProducts);
  }
}

// Function that chooses random product
function chooseProduct() {
  console.log('product array length before function runs: ' + products.length);
  var chosenProductsLocal = []; // creates a local variable to store randomly generated products
  chosenProducts = []; // resets global chosenProducts var to empty array
  for (var i = 0; i < displayNumber; i++) { // for loop for choosing items
    var number = random(products);
    var product = products[number];
    chosenProductsLocal.push(product); // pushes the product to the local array
    products.splice(number, 1); // removes the product from the products array so it can't be selected again
  }
  addBackProducts(chosenProducts); // call function to add back products displayed 2 rounds ago
  chosenProducts.push(chosenProductsLocal);
  chosenProducts = chosenProducts.reduce(function(a, b) {return a.concat(b);}, []);
  console.log('loop done, chosen products are:  ' + chosenProducts);
}

// Function that displays objects in dome
function displayObjects(chosenProductsArray) {
  console.log('before loop runs');
  for (var j = 0; j < chosenProductsArray.length; j++) {
    console.log('loop runs: ' + j);
    var productDivEl = document.createElement('div');
    productDivEl.setAttribute('class', 'product');
    productDivEl.setAttribute('id', chosenProductsArray[j].id);
    productDivEl.textContent = chosenProductsArray[j].displayName;
    console.log(productDivEl.textContent);
    userChoiceSectionEl.appendChild(productDivEl);
  }
}

var products = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, usb, waterCan, wineGlass]; // all products
