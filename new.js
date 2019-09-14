// so i can write a file
var fs = require('fs');
// makes all the rolls
var Combinatorics = require('js-combinatorics');
// gets the face count from the input and makes it a number
var faceCount = +process.argv[2];
// gets the dice count from the input and makes it a number
var diceCount = +process.argv[3];
// makes a dynamic file name
var filename = `numberOfDice${diceCount}sidesOfDice${faceCount}`;

// a function that just makes an array of 1 to faceCount
function makeDie(faceCount) {
    var die = [];
    for (let i = 1; i <= faceCount; ++i) {
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
var keepers = rolls.filter(function (r) {
    // if this function returns true then it keeps the roll
    var keep =
        // check if the first die is 4
        r[0] === 4 ||
        // check if the second die is 4
        r[1] === 4 ||
        // check if the third die is 4
        r[2] === 4 ||
        // check if the first + second die is 4
        r[0] + r[1] === 4 ||
        // check if the first + third die is 4
        r[0] + r[2] === 4 ||
        // check if the second + third die is 4
        r[1] + r[2] === 4 ||
        // check if the sum of all three dice is 4
        r[0] + r[1] + r[2] === 4;
    return keep;
});

// this prints out the math and the percentage
console.log(keepers.length + '/' + max + '=' + (keepers.length / max * 100) + '%');
// this writes the file with the rolls and the keepers
fs.writeFileSync(filename + ".txt", rolls.join('\n') + "\n\n\n" + keepers.join('\n'), 'utf8');
