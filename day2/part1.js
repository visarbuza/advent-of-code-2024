const fs = require('fs');

const isInRange = (number) => number >= 1 && number <= 3;

const isSafe = (arr) => {
    if (!isInRange(Math.abs(arr[0] - arr[1]))) {
        return false;
    }
    let increasing = arr[1] > arr[0];
    let isValid = true;
    for (let i = 1; i < arr.length - 1; i++) {
        let currentDifference = Math.abs(arr[i] - arr[i + 1]);
        let currentIncreasing = arr[i + 1] > arr[i];
        if (!(isInRange(currentDifference) && currentIncreasing == increasing)) {
            isValid = false;
            break;
        }
    }
    return isValid;
}

try {
    // Read entire file as a string
    const data = fs.readFileSync('input.txt', 'utf8');
    const numberOfSafe = data
        .trim()
        .split("\n")
        .map(s => s.split(" ").map(Number))
        .filter(isSafe)
        .length;
    
    console.log(numberOfSafe);
} catch (error) {
    console.error('Error reading file:', error);
}
