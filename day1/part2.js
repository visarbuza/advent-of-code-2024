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
    
    const rightSideFrequencies = new Map();
    for (let i = 0; i < rightSide.length; i++) {
        if (rightSideFrequencies[rightSide[i]] == undefined) {
            rightSideFrequencies[rightSide[i]] = 0; 
        }
        rightSideFrequencies[rightSide[i]]++;
    }

    const frequencies = new Map();
    for (let i = 0; i < leftSide.length; i++) {
        frequencies[leftSide[i]] = 0;
        const appearsInRightSide = rightSideFrequencies[leftSide[i]];
        if (appearsInRightSide != undefined) {
            frequencies[leftSide[i]] = appearsInRightSide;
        }
    }

    const sum = leftSide.reduce((acc, curr, i) =>  acc + curr * frequencies[curr], 0);
    console.log(sum);
} catch (error) {
    console.error('Error reading file:', error);
}
