const fs = require('fs');

const up = [-1, 0];
const right = [0, 1];
const down = [1, 0];
const left = [0, -1];

const rotateRight = (direction) => {
    const directionOrder = [up, right, down, left]
    const currentIndex = directionOrder.findIndex(dir => 
    dir[0] === direction[0] && dir[1] === direction[1])

    const nextIndex = (currentIndex + 1) % directionOrder.length;
    return directionOrder[nextIndex];
}

try {
    // Read entire file as a string
    const input = fs.readFileSync('input.txt', 'utf8');
    const map = input
        .trim()
        .split("\n")
        .map(line => line.split(''))
    
    const inMap = (x, y) => {
        if (x < 0 || x >= map.length) {
            return false;
        }
        if (y < 0 || y >= map[x].length) {
            return false;
        }
        return true;
    }
    

    let position = undefined;
    let direction = up;
    outerLoop: for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === '^') {
                position = [row, col];
                break outerLoop;
            }
        }
    }

     
    let set = new Set();
    while (true) {
        set.add(`${position[0]},${position[1]}`)
        map[position[0]][position[1]] = 'X';
        
        const row = position[0] + direction[0];
        const col = position[1] + direction[1];

        if (!inMap(row, col)) {
            break;
        }

        if (map[row][col] === '#') {
            direction = rotateRight(direction);
            continue;
        }
        position = [row, col];
    }

    console.log(set.size);
} catch (error) {
    console.error('Error reading file:', error);
}
