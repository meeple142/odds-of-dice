/*eslint-env node*/
/*eslint no-unused-vars:0, no-console:0*/
var fs = require('fs');
var sidesOfDice = +process.argv[2];
var numOfDice = +process.argv[3];
var filename = process.argv[4]
var max = Math.pow(sidesOfDice, numOfDice);
var rolls = [];
var text;
var i;

console.log("max:", max);

for (i = 0; i < max; ++i) {
    //make the base
    text = i.toString(sidesOfDice);

    //add 0 to the front
    while (text.length < numOfDice) {
        text = "0" + text;
    }

    rolls.push(text.split('')
        .sort()
        .join('-'))

}
var str = rolls
    .sort()
    .join('\n');
//var str = rolls.join('\n');
//var count = str.match(/^.*(\d)-\1-(\d)-\2-\2.*$/gm).length
//console.log(count + '/' + max + '=' + (count / max * 100) + '%');
fs.writeFileSync(filename + ".txt", rolls.join('\n'), 'utf8');
