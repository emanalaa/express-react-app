"use strict";
exports.__esModule = true;
var csv = require('csv-parser');
var fs = require('fs');
fs.createReadStream('listings.csv')
    .pipe(csv())
    .on('data', function (row) {
    console.log(row);
})
    .on('end', function () {
    console.log('CSV file successfully processed');
});
