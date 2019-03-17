'use strict'

const program = require('commander');
const utils = require('./utils');

program
    .version('0.0.1')
    .command('count [person, [time start] [time end]]')
    .description('count hours for table tennis players and their schedules')
    .option('-i, --input', 'input needed data, <PERSON> [<TIME START> <TIME END>]')
    .action(function() {
        test_list();
    });

program.parse(process.argv);

function test_list() {
    var test = [
        {name: "mamang", shots: "5"},
        {name: "miming", shots: "10"}
    ]

    var person = 2;
    
    var data = [
        [9, 10],
        [9, 12],
        [9, 10],
        [9, 10],
        [9, 10],
    ]
    

    var rangeArray = [];

    for (let i = 0; i < data.length; i++ ) {
        rangeArray[i] = utils.range(data[i][0], data[i][1]);
    }


    console.log("----TEST LIST----");
    
    rangeArray.forEach((d) => {
        console.dir(d);
    });
    console.log("----DISTINCT ARRAY----");
    let distinct = utils.getDistinct2D(rangeArray);
    console.dir(distinct);

    // Counting the process
    console.log("----COUNTING ARRAY----")
    // let result = [...data.reduce((m,v) => m.set(v, (m.get(v) || 0) + 1), new Map())];
    let countArray= new Map();
    rangeArray.map(arrayVal  => {
        distinct.map(elem => {
            // console.log("now searching for: " + elem + " in: " + arrayVal);
            // console.log("results of searching: " + arrayVal.indexOf(elem));

            // var count = arrayVal.reduce((n, val) => {
            //     return n + (val === elem);
            // });
            if (arrayVal.indexOf(elem) !== -1) {
                let previousVal = countArray.get(elem);
                countArray.set(elem, (isNaN(previousVal) || previousVal === undefined) ? 1 : previousVal + 1);
            }            

            // countArray.push([elem, count]);
        })
    });


    console.dir(countArray);

    console.log("----RESULT----")
    var singles = 0;
    var doubles = 0;

    for (var val of countArray.values()) {
        if (val >= 4) {
            doubles += 1;
        } else if (val >= 2) {
            singles += 1;
        }
    }

    singles -= 1;
    doubles -= 1;

    if (singles < 0) {
        singles = 0;
    }
    
    if (doubles < 0) {
        doubles = 0;
    }

    console.log("singles: " + singles);
    console.log("doubles: " + doubles);
}

