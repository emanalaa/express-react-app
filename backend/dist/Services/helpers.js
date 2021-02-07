"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortHashtableByValue = exports.ConvertTimestampToDate = void 0;
function ConvertTimestampToDate(timestamp) {
    try {
        var date = new Date(timestamp);
        var month = +date.getMonth() + 1;
        var year = date.getFullYear();
        return month.toString() + '.' + year;
    }
    catch (_a) {
        return "";
    }
}
exports.ConvertTimestampToDate = ConvertTimestampToDate;
function sortHashtableByValue(object, isAscending) {
    //sort type: 0 (by key), 1(by value)
    var sortable = [];
    for (var key in object)
        sortable.push([key, object[key]]);
    if (isAscending == true) //Sort ascendingly
        sortable.sort(function (a, b) {
            return a[1] - b[1];
        });
    else //sort dscendingly 
        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
    return sortable;
}
exports.sortHashtableByValue = sortHashtableByValue;
//# sourceMappingURL=helpers.js.map