'use strict';

// Global variables
var chosenProducts = []; // variable to hold the last chosen products
var displayNumber = 3; // how many products to show at one time
var roundsCount = 25; // how many times the user will get a choice of products
var totalClicks = 0;

// Global DOM variables
var divOneEl = document.getElementById('product1');
var divTwoEl = document.getElementById('product2');
var divThreeEl = document.getElementById('product3');
var resultsSectionEl = document.getElementById('results');

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
  productImageEl.setAttribute('class', 'product-image');
  productImageEl.setAttribute('src', this.filepath);
  divDOM.appendChild(productImageEl);
};
Product.prototype.removeImage = function() {
  var removeImgEl = document.getElementById(this.id);
  var imgContainerEl1 = removeImgEl.parentNode;
  imgContainerEl1.removeChild(removeImgEl);
};
Product.prototype.productClick = function(event) {
  event.preventDefault(); // may be default to load page
  event.stopPropagation(); // if not added, could fire event to any ancestor element
  this.clickCount++;
  totalClicks++;
  console.log(this.id + ' click count is ' + this.clickCount);
  console.log('Total clicks: ' + totalClicks);
  clearObjects();
  // Chooses and displays new products while totalClicks is less than roundsCount
  while (totalClicks < roundsCount) {
    chooseProduct();
    displayObjects();
    break;
  }
  if (totalClicks === roundsCount) {
    displayTotals();
  }
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
function displayObjects() {
  products[chosenProducts[0]].createImage(divOneEl);
  products[chosenProducts[1]].createImage(divTwoEl);
  products[chosenProducts[2]].createImage(divThreeEl);
}

// Function that removes imgs from DOM
function clearObjects() {
  products[chosenProducts[0]].removeImage();
  products[chosenProducts[1]].removeImage();
  products[chosenProducts[2]].removeImage();
}

// Adds event listeners to three divs in user-test.html
divOneEl.addEventListener('click', function() {products[chosenProducts[0]].productClick(event);}, false);
divTwoEl.addEventListener('click', function() {products[chosenProducts[1]].productClick(event);}, false);
divThreeEl.addEventListener('click', function() {products[chosenProducts[2]].productClick(event);}, false);

// After test has run, show images and their totals
function displayTotals() {
  for (var index = 0; index < products.length; index++) {
    var divEl = document.createElement('div');
    divEl.setAttribute('class', 'result');
    var imgEl = document.createElement('img');
    imgEl.setAttribute('src', products[index].filepath);
    var paraEl = document.createElement('p');
    paraEl.textContent = ('Clicked: ' + products[index].clickCount + ' / Displayed: ' + products[index].displayCount);
    divEl.appendChild(paraEl);
    divEl.appendChild(imgEl);
    resultsSectionEl.appendChild(divEl);
  }
}

// Array of all products
var products = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, usb, waterCan, wineGlass]; // all products

function runTest() {
  chooseProduct();
  displayObjects();
}

runTest();
