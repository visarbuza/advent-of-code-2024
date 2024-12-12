const fs = require('fs');

const createRuleMap = (rules) => {
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
    return rulesMap;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const rules = input.trim()
        .split('\n\n')[0]
        .split("\n")
    const updates = input.trim()
        .split('\n\n')[1]
        .split("\n")
        .map(row => row.split(",").map(Number))
    
    const rulesMap = createRuleMap(rules);
    
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
        if (!isValid) {
            update = update.sort((a, b) => {
                const aInfo = rulesMap[a];
                const bInfo = rulesMap[b];
                if (aInfo?.larger?.includes(b) || bInfo?.smaller?.includes(a)) {
                    return -1;
                }
                if (aInfo?.smaller?.includes(b) || bInfo?.larger?.includes(a)) {
                    return 1;
                }
                return 0;
            })
            sum += update.length % 2 === 0 ? update[update.length / 2] : update[Math.floor(update.length / 2)]
        }
    }
    console.log(sum);
} catch (error) {
    console.error('Error reading file:', error);
}
