function createArray(rows, column) {
    var arr = [];
    let expRows = parseInt(rows + 2);
    let expCols =  parseInt(column + 2);

    for (let i = 0; i < expRows; i++) {
        let r = [];
        for (let j = 0; j < expCols; j++) {
            if (i === 0 || i === (expRows - 1) || j === 0 || j === (expCols - 1)) {
                r.push("u");
            } else {
                r.push(0);
            }
        }
        arr.push(r);
    }

    return arr;
}



function findingNeighbors(myArray, i, j) {
    let res = [];
    let rowLimit = myArray.length-1;
    let columnLimit = myArray[0].length-1;

    for(var x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
        for(var y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
        if(x !== i || y !== j) {
            if (myArray[x][y] === undefined) {
                res.push("u");
            } else {
                res.push(myArray[x][y]);
            }
        } else {
            res.push("X");
        }
        }
    }

    // console.log(`
    //     [${res[0]} ${res[1]} ${res[2]}]
    //     [${res[3]} ${res[4]} ${res[5]}]
    //     [${res[6]} ${res[7]} ${res[8]}]
    // `);

    return res;
}

function findTopLeftNeighbors(array, i, j) {
    let top = array[i-1][j];
    let left = array[i][j-1];
    let res = [];
    return res = [top, left];
}

function filterArrayOddEven(mode, array) {
    let result = [];
    if (mode === "odd") {
        result = array.filter((element, index, arr) => {
            return (index % 2 !== 0);
        });
    } else if (mode === "even") {
        result = array.filter((element, index, arr) => {
            return (index % 2 !== 0);
        });
    } 
    return result;
}

function sumArray(array) {
    let isnum = n => isNaN(n) ? 0 : n;
    let sum = array.reduce((x, y) => isnum(x) + isnum(y));
    return sum;
}
  
function indexOfSmallest(array) {
    var lowest = 0;
    for (var i = 1; i < array.length; i++) {
        if (array[i] < array[lowest]) {
            lowest = i 
        }
    }
    return lowest;
}

module.exports = {
    createArray,
    findingNeighbors,
    findTopLeftNeighbors,
    filterArrayOddEven,
    sumArray,
    indexOfSmallest
}