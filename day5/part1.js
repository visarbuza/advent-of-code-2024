const fs = require('fs');

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const rules = input.trim()
        .split('\n\n')[0]
        .split("\n")
    const updates = input.trim()
        .split('\n\n')[1]
        .split("\n")
        .map(row => row.split(",").map(Number))
    
    // create a rules datastructure
    // go over every page check if it satisfies the rules n2
    //
    const rulesMap = new Map();

    for (let rule of rules) {
        const [left, right] = rule.split("|").map(Number);

        // Handle left rule
        if (rulesMap[left] === undefined) {
            rulesMap[left] = {
                larger: [right]
            };
        } else {
            if (!rulesMap[left].larger) {
                rulesMap[left].larger = [];
            }
            rulesMap[left].larger.push(right);
        }

        // Handle right rule
        if (rulesMap[right] === undefined) {
            rulesMap[right] = {
                smaller: [left]
            };
        } else {
            if (!rulesMap[right].smaller) {
                rulesMap[right].smaller = [];
            }
            rulesMap[right].smaller.push(left);
        }
    }

    let sum = 0;
    const result = []
    for (let update of updates) {
        let isValid = true;
        for (let i = 0; i < update.length; i++) {
            const currentPage = update[i];
            for (let j = 0; j < update.length; j++) {
                const toCompare = update[j];
                const info = rulesMap[currentPage];
                if (info === undefined) {
                    continue;
                }
                if (j < i) {
                    if (info.larger === undefined) {
                        continue;
                    } 
                    if (info.larger.includes(toCompare)) {
                        isValid = false;
                        break;
                    }
                } else if (j > i) {
                    if (info.smaller === undefined) {
                        continue;
                    }
                    if (info.smaller.includes(toCompare)) {
                        isValid = false;
                        break;
                    }
                }
            }
        }
        if (isValid) {
            let middle = 0;
            if (update.length % 2 === 0) {
                middle = update[update.length / 2]
            } else {
                middle = update[Math.floor(update.length / 2)]
            }
            sum += middle;
        }
    }
    console.log(sum);
} catch (error) {
    console.error('Error reading file:', error);
}
