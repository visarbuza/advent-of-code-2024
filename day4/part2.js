const fs = require('fs');

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const memory = input.trim().split("\n");
    const word = "MAS";
    
    let wordCount = 0;
    for (let row = 1; row < memory.length - 1; row++) {
        for (let col = 1; col < memory[row].length - 1; col++) {
            if (memory[row][col] !== 'A') {
                continue
            }

            const downRight = memory[row - 1][col - 1] + memory[row][col] + memory[row + 1][col + 1];
            const downLeft= memory[row - 1][col + 1] + memory[row][col] + memory[row + 1][col - 1];
            const upRight  = downLeft.split('').reverse().join('');
            const upLeft = downRight.split('').reverse().join('');
            
            if (downRight == word && downLeft == word ||
                downRight == word && upRight == word ||
                upLeft == word && downLeft == word ||
                upLeft == word && upRight == word
            ) {
                wordCount++;
            }
        }
    }
    console.log(wordCount);
} catch (error) {
    console.error('Error reading file:', error);
}
