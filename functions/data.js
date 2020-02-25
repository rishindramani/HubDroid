'use strict';

const fs = require('fs');
const rawData = fs.readFileSync('data.json');
const parsedData = JSON.parse(rawData);

function compare(a, b) {
  if (a.price > b.price) return -1;
  if (b.price > a.price) return 1;
  return 0;
}

const phones = [];
const laptops = [];
const tablets = [];

for(let i = 0; i < parsedData.length; i++){
  const device = parsedData[i];
  const deviceData = {
    name: device.Name,
    description: device.Description,
    price: Number(device.Price.replace(/[^0-9.-]+/g,""))
  }
  if(device.subcategoryLink === 'Laptops' || device.categoryLink === 'Laptops'){
    laptops.push(deviceData);
  }
  else if(device.subcategoryLink === 'Tablets' ||  device.categoryLink === 'Tablets'){
    tablets.push(deviceData);
  }
  else if(device.categoryLink === 'Phones' || device.categoryLink === 'Phones'){
    phones.push(deviceData);
  }
}
phones.sort(compare);
laptops.sort(compare);
tablets.sort(compare);

exports.phones = phones;
exports.laptops = laptops;
exports.tablets = tablets;