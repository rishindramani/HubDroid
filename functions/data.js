'use strict';

// Read and parse data from JSON file.
const fs = require('fs');
const rawData = fs.readFileSync('data.json');
const parsedData = JSON.parse(rawData);

// To sort the items based on price.
function compare(a, b) {
  if (a.price > b.price) return -1;
  if (b.price > a.price) return 1;
  return 0;
}

// Creating a categories based on the data.
const lights = [];
const fans = [];
const chairs = [];

// Pushing items to array.
for(let i = 0; i < parsedData.length; i++){
  const device = parsedData[i];
  const deviceData = {
    name: device.Name,
    description: device.Description,
    rating: device.Rating,
    sale: device.Sale,
    img1: device.Image1,
    category: device.category,
    price: Number(device.Price.replace(/[^0-9.-]+/g,""))
  }
  if(device.category === 'Lights'){
    lights.push(deviceData);
  }
  else if(device.category === 'Fans'){
    fans.push(deviceData);
  }
  else if(device.category === 'Chairs'){
    chairs.push(deviceData);
  }
}

// Sorting the items of array.
lights.sort(compare);
fans.sort(compare);
chairs.sort(compare);

// Exporting the items to be made available in other files.
exports.lights = lights;
exports.fans = fans;
exports.chairs = chairs;
