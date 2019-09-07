const readline = require('readline');
const rl = readline.createInterface({input: process.stdin});
var stdin = [];
rl.on('line', function (line) { stdin.push(line); });
rl.on('close', main);

stdin = [
    "11 3",
    "0 0 0 1 2 3 0 1 0 1 1",
    "1 2 3",
];
rl.close();

function main() {
    const [ n, m ] = stdin[0].split(' ').map(value => +value);
    const dArr = stdin[1].split(' ').map(value => +value);
    const aArr = stdin[2].split(' ').map(value => +value);

    const aArrSort = aArr.map((value, idx) => ({ value, idx: idx + 1 }));
    aArrSort.sort((a, b) => b.value - a.value);

    let days = 0;
    let lastDay = 0;
    for (let aSort of aArrSort) {
        const newDay = days + aSort.value;
        const day = dArr.findIndex((value, idx) => idx + 1 > newDay && value === aSort.idx);

        if (day === -1) {
            return console.log(-1);
        }

        days = newDay;
        lastDay = Math.max(lastDay, day + 1);
    }

    if (lastDay > n) {
        return console.log(-1);
    }

    console.log(lastDay);
}
