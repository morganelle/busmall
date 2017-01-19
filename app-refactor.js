'use strict';

// Global variables
var chosenProducts = []; // variable to hold the last chosen products
var displayNumber = 3; // how many products to show at one time
var roundsNumber = 25; // how many times the user will get a choice of products
var totalClicks = 0;

// Global DOM element
var sectionTestEl = document.getElementById('user-choice');

// Array of all images
var images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var products = [];

// Product constructor function
function Product(filename) {
  this.filename = filename;
  this.filepath = 'assets/' + filename;
  this.id = filename.substr(0, filename.lastIndexOf('.')) || filename;
  this.displayCount = 0;
  this.clickCount = 0;
}

// Product methods
Product.prototype.createClickableElement = function() {
  this.displayCount++;
  console.log(this.filename + ': ' + this.displayCount);
  var divEl = document.createElement('div');
  divEl.setAttribute('class', 'product');
  divEl.setAttribute('id', this.id);
  divEl.addEventListener('click', function() {
    this.productClick(event);}, false); // doesn't seem to recognize "this" inside event listener function
  var productImageEl = document.createElement('img');
  productImageEl.setAttribute('src', this.filepath);
  divEl.appendChild(productImageEl);
  sectionTestEl.appendChild(divEl);
};
Product.prototype.productClick = function(event) { // doesn't seem to recognize "this" inside event listener function
  this.clickCount++;
  totalClicks++;
  console.log(this.filename + ' was clicked');
};

// Creates objects for every item in the images array
images.forEach(function(image) {
  var imageObject = new Product(image);
  products.push(imageObject);
});

// Function that chooses random number
function random() {
  return Math.floor(Math.random() * products.length);
}

// Creates an array of three unique numbers, with no duplicates from the previous iteration
function chooseProducts() {
  var product;
  for (var i = 0; i < displayNumber; i++) {
    do {
      product = random();
    }
    while (chosenProducts.includes(product));
    chosenProducts.push(product);
  }
  if (chosenProducts.length > displayNumber) {
    chosenProducts.splice(0, displayNumber);
  }
}

// run functions
chooseProducts();

// Populates the DOM with clickable divs based on the chosenProducts array
chosenProducts.forEach(function(index) {
  console.log(products[index]);
  products[index].createClickableElement();
});
