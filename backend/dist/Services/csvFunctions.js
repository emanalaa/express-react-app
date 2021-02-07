"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidContactsFormat = exports.IsValidListingsFormat = void 0;
const csvParser = require('csv-parser');
const fs = require('fs');
function IsValidListingsFormat(listings) {
    if (listings.length == 0)
        return false;
    let isValid = true;
    for (const listing of listings) {
        let x = listing;
        if (x === undefined || x.id === undefined || x.make == null || x.price == undefined || x.mileage == undefined || x.seller_type == undefined) {
            isValid = false;
            break;
        }
    }
    console.log("Is valid listings file? " + isValid);
    return isValid;
}
exports.IsValidListingsFormat = IsValidListingsFormat;
function IsValidContactsFormat(contacts) {
    if (contacts.length == 0)
        return false;
    let isValid = true;
    for (const contact of contacts) {
        var x = contact;
        if (x === undefined || x.contact_date === undefined || x.listing_id === undefined) {
            isValid = false;
            break;
        }
    }
    console.log("Is valid contacts file? " + isValid);
    return isValid;
}
exports.IsValidContactsFormat = IsValidContactsFormat;
//# sourceMappingURL=csvFunctions.js.map