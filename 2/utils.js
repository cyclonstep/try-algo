function range(start, end) {
    if (start === end || start > end ) return [start];
    return [start, ...range(start +1, end)]
}

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

function arrSortNum(a, b) {
    return a - b;
}

// function countDup() {}

module.exports = {
    range,
    getDistinct2D,
    arrSortNum
};