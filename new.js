var fs = require('fs');
var Combinatorics = require('js-combinatorics');
var faceCount = +process.argv[2];
var diceCount = +process.argv[3];
var filename = `numberOfDice${diceCount}sidesOfDice${faceCount}`;

function makeDie(faceCount){
    var die = [];
    for(let i = 1; i <= faceCount; ++i){
        die.push(i);
    }
    return die;
}

var rolls = Combinatorics.baseN(makeDie(faceCount), diceCount).toArray();
console.log("max:", rolls.length);

var keepers = rolls.filter(r => {
    var keep =
        r[0] === 4 ||
        r[1] === 4 ||
        r[2] === 4 ||
        r[0] + r[1] === 4 ||
        r[0] + r[2] === 4 ||
        r[1] + r[2] === 4 ||
        r[0] + r[1] + r[2] === 4;
    return keep;
});

console.log(keepers.length + '/' + max + '=' + (keepers.length / max * 100) + '%');
fs.writeFileSync(filename + ".txt", rolls.join('\n') + "\n\n\n" + keepers.join('\n'), 'utf8');
