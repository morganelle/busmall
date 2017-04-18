'use strict';

// Global variables
var chosenProducts = []; // variable to hold the last chosen products
var products = []; // stores Product instances
var roundsCount = 25; // how many times the user will get a choice of products
var totalClicks = 0;

// Global DOM variables
var divEls = [];
var sectionEl = document.getElementById('user-choice');
var resultsSectionEl = document.getElementById('results');
var context = document.getElementById('results-chart').getContext('2d');

// Global chart variables
var chartData = [];
var chartLabels = [];

// Object constructor for products
function Product(filename, id, displayName) {
  this.filename = filename;
  this.id = id;
  this.displayName = displayName;
  this.displayCount = 0;
  this.clickCount = 0;
  products.push(this);
}

Product.prototype.createImage = function(divDOM) {
  this.displayCount++;
  var productImageEl = document.createElement('img');
  productImageEl.setAttribute('id', this.id);
  productImageEl.setAttribute('class', 'product-image');
  productImageEl.setAttribute('src', 'images/' + this.filename);
  divDOM.appendChild(productImageEl);
};
Product.prototype.removeImage = function() {
  var removeImgEl = document.getElementById(this.id);
  var imgContainerEl1 = removeImgEl.parentNode;
  imgContainerEl1.removeChild(removeImgEl);
};
Product.prototype.incrementStorage = function() {
  var localClick = JSON.parse(localStorage.getItem(this.id));
  localClick++;
  console.log(localClick);
  localStorage.setItem(this.id, localClick);
};
Product.prototype.beginLocalStorage = function() {
  if (localStorage.getItem(this.id)) {
    console.log(this.id + ' already exists in localStorage');
  }
  else {
    localStorage.setItem(this.id, this.clickCount);
    console.log(this.id + ' created in localStorage');
  }
};
Product.prototype.productClick = function() {
  this.beginLocalStorage();
  this.clickCount++;
  this.incrementStorage();
  totalClicks++;
  // Chooses and displays new products while totalClicks is less than roundsCount
  while (totalClicks < roundsCount) {
    clearObjects(3);
    runTest(3);
    break;
  }
  if (totalClicks === roundsCount) {
    displayTotals(products);
    populateChartLabels(products);
    populateChartData(products);
    // chart start
    var chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
    var myFirstChart = new Chart(context, {
      type: 'horizontalBar',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Votes per product',
          data: chartData,
          backgroundColor: '#97B6BE',
          borderColor: '#709BA6',
          borderWidth: 1
        }]
      },
      options: chartOptions
    });
    // end chart
  }
};

// Product template
// var name = new Product('filename', 'id', 'description');
new Product('bag.jpg', 'bag', 'wheely bag');
new Product('banana.jpg', 'banana', 'nanner slicer');
new Product('bathroom.jpg', 'bathroom', 'tablet \'n TP');
new Product('boots.jpg', 'boots', 'toe-free boots');
new Product('breakfast.jpg', 'breakfast', 'breakfast machine');
new Product('bubblegum.jpg', 'bubblegum', 'meaty chewing gum');
new Product('chair.jpg', 'chair', 'chair with domed seat');
new Product('cthulhu.jpg', 'cthulhu', 'tiny cthulhu');
new Product('dog-duck.jpg', 'dog-duck', 'pup quackers');
new Product('dragon.jpg', 'dragon', 'exotic meats: dragon');
new Product('pen.jpg', 'pen', 'cutlery pens');
new Product('pet-sweep.jpg', 'pet-sweep', 'sweeper slippers for pets');
new Product('scissors.jpg', 'scissors', 'pizza sheers');
new Product('shark.jpg', 'shark', 'shark bag');
new Product('sweep.png', 'sweep', 'sweeper onesie');
new Product('tauntaun.jpg', 'tauntaun', 'tauntaun bag');
new Product('unicorn.jpg', 'unicorn', 'exotic meats: unicorn');
new Product('usb.gif', 'usb', 'living USB');
new Product('water-can.jpg', 'water-can', 'watering made difficult');
new Product('wine-glass.jpg', 'wine-glass', 'teetotaler glass');

// Function that chooses random number
function random() {
  return Math.floor(Math.random() * products.length);
}

// Function that chooses 3 random numbers without repeats
function chooseProduct(count) {
  var product;
  for (var i = 0; i < count; i++) {
    do {
      product = random();
    }
    while (chosenProducts.includes(product));
    chosenProducts.push(product);
  }
  if (chosenProducts.length > count) {
    chosenProducts.splice(0,count);
  }
}

function createDivs(count) {
  for (var k = 0; k < count; k++) {
    var div = document.createElement('div');
    div.setAttribute('id', 'product' + k);
    div.setAttribute('class', 'product');
    sectionEl.appendChild(div);
    divEls.push(div);
  }
}

// Function that displays objects in DOM
function displayObjects(count) {
  for (var j = 0; j < count; j++) {
    products[chosenProducts[j]].createImage(divEls[j]);
  }
}

// Function that removes imgs from DOM
function clearObjects(count) {
  for (var j = 0; j < count; j++) {
    products[chosenProducts[j]].removeImage();
  }
}

// After test has run, show images and their totals
function displayTotals(productArray) {
  for (var index = 0; index < productArray.length; index++) {
    var divEl = document.createElement('div');
    divEl.setAttribute('class', 'result');
    var imgEl = document.createElement('img');
    imgEl.setAttribute('src', 'images/' + productArray[index].filename);
    var paraEl = document.createElement('p');
    paraEl.textContent = ('Clicked: ' + productArray[index].clickCount + ' / Displayed: ' + productArray[index].displayCount);
    divEl.appendChild(paraEl);
    divEl.appendChild(imgEl);
    resultsSectionEl.appendChild(divEl);
  }
}

// Create arrays for chart.js
function populateChartData(productArray) {
  for (var i = 0; i < productArray.length; i++) {
    var chartDatum = JSON.parse(localStorage.getItem(productArray[i].id));
    chartData.push(chartDatum);
  }
}
function populateChartLabels(productArray) {
  for (var i = 0; i < productArray.length; i++) {
    var chartDatum = productArray[i].id;
    chartLabels.push(chartDatum);
  }
}

function beginTest(count) {
  localStorage.clear();
  createDivs(count);
  divEls[0].addEventListener('click', function() {products[chosenProducts[0]].productClick(event);}, false);
  divEls[1].addEventListener('click', function() {products[chosenProducts[1]].productClick(event);}, false);
  divEls[2].addEventListener('click', function() {products[chosenProducts[2]].productClick(event);}, false);
  runTest(count);
}

function runTest(count) {
  chooseProduct(count);
  displayObjects(count);
}

beginTest(3);
