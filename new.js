
var check = require('./checkFrog.js')
// gets the face count from the input and makes it a number
var faceCount = +process.argv[2];
// gets the dice count from the input and makes it a number
var diceCount = +process.argv[3];


    check(faceCount, diceCount);
