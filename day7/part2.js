const fs = require('fs');

try {
    // Read entire file as a string
    const input = fs.readFileSync('input.txt', 'utf8');
    const equations = input
        .trim()
        .split('\n')
        .map(line => line
            .split(':')
            .map(p => p.trim()))
        .map(([result, nums]) => {
            return {result: Number(result), numbers: nums.split(' ').map(Number)}
        });

    const ops = ['plus', 'multiply', 'concat'];
    let sum = 0;
    for (let equation of equations) {
        const operations = generateCombinations(ops, equation.numbers.length - 1);
        for (let comb of operations) {
            let result = equation.numbers[0];
            for (let i = 0; i < comb.length; i++) {
                if (comb[i] === 'plus') {
                    result += equation.numbers[i + 1];
                } else if (comb[i] === 'multiply') {
                    result *= equation.numbers[i + 1];
                } else {
                    result = Number(result.toString() + equation.numbers[i + 1].toString());
                }
            }
            if (result === equation.result) {
                sum += equation.result;
                break;
            }
        }
    }
    
    console.log(sum);
} catch (error) {
    console.error('Error reading file:', error);
}

function generateCombinations(options, k) {
    if (k === 1) {
      return options.map(opt => [opt]);
    }

    const smallerCombos = generateCombinations(options, k - 1);
    const result = [];
  
    // For each combination of length (k-1), append each option to create length k
    for (const combo of smallerCombos) {
      for (const opt of options) {
        result.push([...combo, opt]);
      }
    }
  
    return result;
  }