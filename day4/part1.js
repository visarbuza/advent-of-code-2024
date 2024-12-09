const fs = require('fs');

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const memory = input.trim().split("\n");
    const word = "XMAS";
    const directions = [
        [ 0,   1],  // Right
        [ 0,  -1],  // Left
        [ 1,   0],  // Down
        [-1,   0],  // Up
        [ 1,   1],  // Down Right
        [ 1,  -1],  // Down Left
        [-1,   1],  // Up Right
        [-1,  -1],  // UP Left 
    ]
    
    let wordCount = 0;
    for (let row = 0; row < memory.length; row++) {
        for (let col = 0; col < memory[row].length; col++) {
            if (memory[row][col] !== 'X') {
                continue
            }

            for (const [dx, dy] of directions) {
                let curr = "X"
                for (let k = 1; k < word.length; k++) {
                    const nx = dx * k;
                    const ny = dy * k;
                    if (row + nx >= memory.length || row + nx < 0) {
                        break;
                    }
                    if (col + ny >= memory[row + dx].length || col + ny < 0) {
                        break;
                    }
                    curr += memory[row + nx][col + ny];
                }
                if (curr == word) {
                    wordCount++;
                }
            }
        }
    }
    console.log(wordCount);
} catch (error) {
    console.error('Error reading file:', error);
}
