/*eslint-env node*/
/*eslint no-unused-vars:0, no-console:0*/
var fs = require('fs');
var sidesOfDice = +process.argv[2];
var numOfDice = +process.argv[3];
// var filename = process.argv[4]
var filename = `numberOfDice${numOfDice}sidesOfDice${sidesOfDice}`;
var max = Math.pow(sidesOfDice, numOfDice);
var rolls = [];
var text;
var i;

console.log("max:", max);

for (i = 0; i < max; ++i) {
    //make the base
    text = i.toString(sidesOfDice);

    //add 0 to the front
    text = text.padStart(numOfDice, "0");

    rolls.push(text.split('').map(n => parseInt(n, 10) + 1));

    // rolls.push(text.split('')
    //     .sort()
    //     .join('-'))
}

var keepers = rolls.filter(r => {
    var eql7 =
        r[0] === 4 ||
        r[1] === 4 ||
        r[2] === 4 ||
        r[0] + r[1] === 4 ||
        r[0] + r[2] === 4 ||
        r[1] + r[2] === 4 ||
        r[0] + r[1] + r[2] === 4;
    return eql7;
});

// var str = rolls
//     .sort()
//     .join('\n');
//var str = rolls.join('\n');
//var count = str.match(/^.*(\d)-\1-(\d)-\2-\2.*$/gm).length
//console.log(count + '/' + max + '=' + (count / max * 100) + '%');
console.log(keepers.length + '/' + max + '=' + (keepers.length / max * 100) + '%');
fs.writeFileSync(filename + ".txt", rolls.join('\n') + "\n\n\n" + keepers.join('\n'), 'utf8');
