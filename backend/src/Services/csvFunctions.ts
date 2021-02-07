import { listing } from "../models/listing.interface";
import { contact } from "../models/contact.interface";

export function IsValidListingsFormat(listings) {
    if (listings.length == 0) return false;

    let isValid: Boolean = true;
    for (const listing of listings) {
        let x: listing = listing;
        if (x === undefined || x.id === undefined || x.make == null || x.price == undefined || x.mileage == undefined || x.seller_type == undefined) {
            isValid = false;
            break;
        }
    }
    return isValid;
}

export function IsValidContactsFormat(contacts) {
    if (contacts.length == 0) return false;

    let isValid: Boolean = true;
    for (const contact of contacts) {
        var x: contact = contact;
        if (x === undefined || x.contact_date === undefined || x.listing_id === undefined) {
            isValid = false;
            break;
        }
    }

    return isValid;
}