'use strict'

var utils = require('./utils');
var data = require('./data');

let rows = 1;
let columns = 5;
let users = 3;

var data = utils.createArray(rows, columns);
positionsPlacement(data, users);

function positionsPlacement(array, users) {
    let count = 0;
    let passed = [];
    let placedUsers = 0;
    let unplacedUsers = 0;

    // We want to make sure that we can place each values as distant as possible
    let cellCount = rows * columns;
    let halfCellCount = Math.round(cellCount/2) + 1;
    let neighborsLimit = (users <= halfCellCount) ? 1 : 2;
    
    // Normal Placement first
    for (let x = 1; x <= rows; x++) {
        for (let y = 1; y <= columns; y++) {
            // Check neighbors first, start from location 1,1
            let topLeft = utils.findTopLeftNeighbors(array, x, y);
            // Sum the value of neighbors
            let summed = utils.sumArray(topLeft);
            // Check if it still enough to place user in this position
            // Based on number of users and its sum limit
            if (summed < neighborsLimit && placedUsers < users) {
                array[x][y] = 1;
                count = (summed === 0) ? count : count + 1;
                placedUsers += 1;
            } else {
                passed.push([x, y]);
            }        
        }
    }
    // Place users that have not been placed before
    // by checking lowest sums of neighbors
    unplacedUsers = users - placedUsers;

    if (unplacedUsers > 0) {
        let neighborSum = [];
        passed.map(data => {
            let i = data[0];
            let j = data[1];

            let neighborArr = utils.findingNeighbors(array, i, j);
            let adjNeighborArr = utils.filterArrayOddEven("odd", neighborArr);
            let summed = utils.sumArray(adjNeighborArr);

            neighborSum.push(summed);
        });
        // Find the smallest neighbors sum
        for (let k = 0; k < unplacedUsers; k++) {
            let smallest = utils.indexOfSmallest(neighborSum);
            let smallestValue = neighborSum[smallest];
            // add count 
            count = count + smallestValue;
            // just checking for the image representation
            elem = passed[smallest];
            array[elem[0]][elem[1]] = 1;

            neighborSum[smallest] = 9999;
        }

    }
    console.log(array);
    console.log(count); 
}
