const fs = require('fs');

try {
    // Read entire file as a string
    const input = fs.readFileSync('input.txt', 'utf8');
    const dataArray = input
        .trim()
        .split("\n")
        .map(entry => entry.split(/\s+/).map(Number));

    const leftSide = dataArray.map(entry => entry[0]).sort();
    const rightSide = dataArray.map(entry => entry[1]).sort();
    const sum = leftSide.reduce((acc, entry, i) => {
        return acc + Math.abs(entry - rightSide[i]);
    }, 0);

    console.log(sum);
} catch (error) {
    console.error('Error reading file:', error);
}
