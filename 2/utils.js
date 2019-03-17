// Return array based on inputted range
function range(start, end) {
    if (start === end || start > end ) return [start];
    return [start, ...range(start +1, end)]
}

// Get distinct value from 2D
function getDistinct2D(array2D) {
    let distinct = [];
    array2D.forEach(arr => {
        for (let i = 0; i < arr.length; i++) {
            if (!distinct.includes(arr[i])) {
                distinct.push(arr[i]);
            }
        }
    });
    return distinct.sort(arrSortNum);
}

// Helper for sorting int for array.prototype.sort()
function arrSortNum(a, b) {
    return a - b;
}

// Check if value is numeric or not.
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


module.exports = {
    range,
    getDistinct2D,
    arrSortNum,
    isNumeric
};