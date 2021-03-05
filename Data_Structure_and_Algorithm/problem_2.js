// Import depandencies
const readline = require("readline");

// CreateInterface ready
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// logic || algorithm
const algo = (arr) => {
    let main = arr.reduce((a, b) => a + b)
    let arrLen = arr.length
    arrTotal = (arrLen + 1) * (arrLen + 2) / 2
    return arrTotal - main
}

// take I/P & send to func
rl.question("", (answer) => {
    let arr = answer.split(" ").map(x => parseInt(x))
    console.log(algo(arr));
    rl.close();
});