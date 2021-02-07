import { listing } from "../models/listing.interface";
import * as helper from "./helpers";
import * as csvFunctions from "./csvFunctions";
import * as path from 'path'
import { response } from "express";

const csvParser = require('csv-parser');
const fs = require('fs');

const listings = [];
const contacts = [];
const mergedData = {};

const filesPath = './public/files';
const listingPath: string = path.resolve(filesPath, 'listings.csv');
const contactsPath: string = path.resolve(filesPath, 'contacts.csv');

try {
  fs.createReadStream(listingPath).pipe(csvParser({ from_line: 2 })).on('data', (row) => {
    listings.push(row);
    var x: listing = row;
    mergedData[row.id] = x;
  });

  fs.createReadStream(contactsPath).pipe(csvParser({ from_line: 2 })).on('data', (row) => {
    contacts.push(row);
  });

}
catch (error) {
  console.log(error);
}


export function getListings() {
  return listings;
}

export function getContacts() {
  return contacts;
}

export function averageListing() {
  try {

    if (csvFunctions.IsValidListingsFormat(listings) == false) {
      response.statusCode = 400;
      return "Please enter a valid listing format file";
    }

    var pricesHash = { 'other': 0.0, 'dealer': 0.0, 'private': 0.0 };
    var countHash = { 'other': 0, 'dealer': 0, 'private': 0 };

    const names = ['other', 'dealer', 'private'];

    for (const listing of listings) {
      if (names.includes(listing.seller_type)) {
        pricesHash[listing.seller_type] += +listing.price;
        countHash[listing.seller_type] += 1;
      }
    }

    var output = {};
    for (var name of names) {
      let average = pricesHash[name] / countHash[name];
      output[name] = average.toFixed(2);
    }

    return output;
  }
  catch (err) {
    console.log(err);
    response.statusCode = 500;
    return "An error occurred while calculating your data";
  }
}

export function percentualDistribution() {
  try {

    if (csvFunctions.IsValidListingsFormat(listings) == false) {
      response.statusCode = 400;
      return "Please enter a valid listing format file";
    }

    var carCountHash = {};
    var totalRecords = listings.length;
    for (const listing of listings) {
      if (carCountHash[listing.make] == null) {
        carCountHash[listing.make] = 1;
      }
      else
        carCountHash[listing.make] += 1;
    }

    for (const key in carCountHash) {
      //carCountHash[key] = (((carCountHash[key] / totalRecords) * 100).toFixed(2)).toString() + "%";
      carCountHash[key] = ((carCountHash[key] / totalRecords) * 100).toFixed(2);
    }

    return helper.sortHashtableByValue(carCountHash, false);
  }
  catch (err) {
    console.log(err);
    response.statusCode = 500;
    return "An error occurred while calculating your data";
  }
}

export function Averge30TopContacted() {
  try {

    if (csvFunctions.IsValidContactsFormat(contacts) == false) {
      response.statusCode = 400;
      return "Please enter a valid contacts format file";
    }

    var contactedHash = GetContactedCounts();

    var uniqueContactsNo = Object.keys(contactedHash).length;
    var top30Count = uniqueContactsNo * (0.30);

    var topContacted = helper.sortHashtableByValue(contactedHash, false).slice(0, top30Count);

    var summation = 0.0;
    for (const contact of topContacted) {
      var id = contact[0];
      summation += +mergedData[id].price;
    }
    return (summation / top30Count).toFixed(2);
  }
  catch (err) {
    console.log(err);
    response.statusCode = 500;
    return "An error occurred while calculating your data";
  }
}

function GetContactedCounts() {

  if (csvFunctions.IsValidContactsFormat(contacts) == false) {
    response.statusCode = 400;
    return "Please enter a valid contacts format file";
  }

  var contactedCount = {};
  for (const contact of contacts) {
    if (contactedCount[contact.listing_id] == null) {
      contactedCount[contact.listing_id] = 1;
    }
    else
      contactedCount[contact.listing_id] += 1;
  }
  return contactedCount;
}

export function top5PerMonth() {
  try {

    if (csvFunctions.IsValidContactsFormat(contacts) == false || csvFunctions.IsValidListingsFormat(listings) == false) {
      response.statusCode = 400;
      return "Please enter a valid contacts and listings format file";
    }

    var groupByMonth = {};
    for (var i = 0; i < contacts.length; i++) {
      var convertedDate = helper.ConvertTimestampToDate(+contacts[i].contact_date);
      if (groupByMonth[convertedDate] == null) {
        groupByMonth[convertedDate] = [contacts[i].listing_id];
      }
      else {
        groupByMonth[convertedDate].push(contacts[i].listing_id);
      }
    }

    var top5Monthly = {};

    for (const key in groupByMonth) {
      let listingIds = groupByMonth[key];
      var monthlyListing = {};

      for (var i = 0; i < listingIds.length; i++) {
        if (monthlyListing[listingIds[i]] == null)
          monthlyListing[listingIds[i]] = 1;
        else
          monthlyListing[listingIds[i]] += 1;
      }

      var sortedListings = helper.sortHashtableByValue(monthlyListing, false);
      sortedListings = sortedListings.slice(0, 5);

      top5Monthly[key] = [];

      for (var i = 0; i < sortedListings.length; i++) {
        var listingValue = mergedData[sortedListings[i][0]];
        var listingMerged = {
          'Ranking': i + 1,
          'ListingId': listingValue.id,
          'Make': listingValue.make,
          'SellingPrice': listingValue.price,
          'Mileage': listingValue.mileage,
          'NumberOfContacts': sortedListings[i][1]
        };
        top5Monthly[key].push(listingMerged);
      }
    }

    //Sort by month
    top5Monthly = Object.keys(top5Monthly).sort().reduce((r, k) => (r[k] = top5Monthly[k], r), {});
    return top5Monthly;
  } catch (err) {
    console.log(err);
    response.statusCode = 500;
    return "An error occurred while calculating your data";
  }
}