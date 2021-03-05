// Import depandencies
const readline = require("readline");

// CreateInterface ready
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// logic || algorithm
const algo = (arr, arrSize) => {
    let i;
    for(i=0; i<arrSize; i++) {
        let rem = arr[i] % arrSize
        arr[rem] = arr[rem] + arrSize
    }
    for(i=0; i<arrSize; i++) {
        if(arr[i] >= (arrSize * 2)) {
            process.stdout.write(i + " ")
        }
    }
};

// take I/P & send to func
rl.question("", (answer) => {
  let arr = answer.split(" ").map(x => parseInt(x))
  algo(arr, arr.length)
  rl.close();
});
