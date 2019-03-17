'use strict'

const readline = require('readline');
const utils = require('./utils');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ':'
});

var person;
var timeTable = [];

// PROMPTS FUNCTIONS
function askTimeTable() {
    if (timeTable.length >= person) {
        console.log(`Singles & Doubles Hours Based on Timetable:`);
        main(timeTable);
        rl.close();
    } else {
        rl.question(`Please enter time table for person no. ${timeTable.length + 1}: `, (answer) => {
            // console.log(answer);
            let answerSplit = answer.split(" ");
            timeTable.push([parseInt(answerSplit[0]), parseInt(answerSplit[1])]);
            askTimeTable();
        });
    }
}

// IIFE FUNCTION. THIS IS GOING TO BE EXECUTED FIRST. 
(function askMainQuestion() {
    rl.question('How many persons? ', (answer) => {
        person = parseInt(answer);
        if (utils.isNumeric(person)) {
            askTimeTable();
        } else {
            console.log('Your input was not recognized as a number. Please try again.');
            askMainQuestion();
        }
    });
}())


// MAIN FUNCTIONS
function main(data) {    
    let rangeArray = [];
    let distinct = [];
    let countArray = new Map()
    let singles = 0;
    let doubles = 0;

    // Create 2D Array Range. ex: [9, 12] becomes [9, 10, 11, 12]
    for (let i = 0; i < data.length; i++ ) {
        rangeArray[i] = utils.range(data[i][0], data[i][1]);
    }

    // Get Distinct Array for each number used
    distinct = utils.getDistinct2D(rangeArray);
    console.dir(distinct);

    // Counting the process
    rangeArray.map(arrayVal  => {
        distinct.map(elem => {
            if (arrayVal.indexOf(elem) !== -1) {
                let previousVal = countArray.get(elem);
                countArray.set(elem, (isNaN(previousVal) || previousVal === undefined) ? 1 : previousVal + 1);
            }            
        })
    });

    for (var val of countArray.values()) {
        if (val >= 4) {
            doubles += 1;
        } else if (val >= 2) {
            singles += 1;
        }
    }

    // -1 For the result, because we wanted to know the gap between durations.
    singles -= 1;
    doubles -= 1;

    if (singles < 0) {
        singles = 0;
    }
    
    if (doubles < 0) {
        doubles = 0;
    }

    console.log(`${singles} ${doubles}`);
}

