
// makes all the rolls
var Combinatorics = require('js-combinatorics');
// so i can write a file
var fs = require('fs');
var pretty = require('json-stringify-pretty-compact');

module.exports = function check(faceCount, diceCount) {
    console.log(faceCount, diceCount);
    // makes a dynamic file name
    var filename = `numberOfPlaces${diceCount}`;

    // a function that just makes an array of 1 to faceCount
    function makeDie(faceCount) {
        var die = [];
        for (let i = 0; i < faceCount; ++i) {
            die.push(i);
        }
        return die;
    }

    // this makes an array of every roll possible
    // each roll is an array of numbers 
    // example [1,1,1] or [1,4,5] being a roll of 1,1,1 or roll of 1,4,5 
    var rolls = Combinatorics.baseN(makeDie(faceCount), diceCount).toArray();

    // prints the number of rolls
    console.log("number of rolls:", rolls.length);

    // this filters the rolls down to the ones we want to keep
    var keepers = rolls.filter(function (d) {
        // if this function returns true then it keeps the roll
        var keep = d[9] === 1
        return keep;
    });

    function toSum(sum, i) {
        return sum + i;
    }

    jumps = keepers.map(roll => {
        return {
            roll: roll,
            sum: roll.reduce(toSum, 0)
        };
    });

    var average = jumps.map(j => j.sum).reduce(toSum,0) / jumps.length;
    console.log(average);
    // this writes the file with the rolls and the keepers
    fs.writeFileSync(filename + ".txt", filename + "\n" + pretty(jumps) + "\n\n", 'utf8');
}
