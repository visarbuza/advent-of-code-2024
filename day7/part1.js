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

    let sum = 0;
    for (let equation of equations) {
        if (canMatchTarget(equation.result, equation.numbers)) {
            sum += equation.result;
        }
    }
    
    console.log(sum);
} catch (error) {
    console.error('Error reading file:', error);
}

function canMatchTarget(target, numbers) {
    if (numbers.length === 1) {
      return numbers[0] === target;
    }
    
    const slots = numbers.length - 1;
  
    for (let mask = 0; mask < (1 << slots); mask++) {
      let result = numbers[0];
      for (let i = 0; i < slots; i++) {
        const op = (mask & (1 << i)) ? '*' : '+';
        const nextNum = numbers[i + 1];
  
        if (op === '+') {
          result = result + nextNum;
        } else {
          result = result * nextNum;
        }
      }
  
      if (result === target) {
        return true;
      }
    }
  
    return false;
  }
