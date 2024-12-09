const fs = require('fs');

const isInRange = (number) => number >= 1 && number <= 3;


const isSafe = (arr) => {
    let increaseDir = false;
    let isValid = true;
    for (let i = 0; i < arr.length - 1; i++) {
        let currentDifference = Math.abs(arr[i] - arr[i + 1]);
        let direction = arr[i + 1] > arr[i];
        if (i == 0) {
            increaseDir = direction
        }
        if (!(isInRange(currentDifference) && direction == increaseDir)) {
            isValid = false;
            break;
        }
    }
    return isValid;
}

const canBecomeSafeWithRemoval = (arr) => {
    // Try removing each level and check if the resulting array is safe
    for (let i = 0; i < arr.length; i++) {
        const modifiedArr = [...arr.slice(0, i), ...arr.slice(i + 1)];
        if (isSafe(modifiedArr)) {
            return true;
        }
    }
    return false;
}

try {
    // Read entire file as a string
    const data = fs.readFileSync('input.txt', 'utf8');

    const numberOfSafeReports = data
        .trim()
        .split("\n")
        .map(s => s.split(" ").map(Number))
        .filter(level => isSafe(level) || canBecomeSafeWithRemoval(level))
        .length;
    
    console.log(numberOfSafeReports);
} catch (error) {
    console.error('Error reading file:', error);
}
