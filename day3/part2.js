const fs = require('fs');

try {
    // Read entire file as a string
    const mulPattern = /^mul\((\d{1,3}),(\d{1,3})\)/;
    const disablePattern = /^don't\(\)/;
    const enablePattern = /^do\(\)/;

    const data = fs.readFileSync('input.txt', 'utf8');
    const str = data.trim();
    let enabled = true;
    let sum = 0;
    let i = 0;

    while (i < str.length) {
        const sequence = str.slice(i);

        const enableMatch = sequence.match(enablePattern);
        if (enableMatch) {
            enabled = true;
            i += enableMatch[0].length - 1;
            continue;
        }
        
        const disableMatch = sequence.match(disablePattern);
        if (disableMatch) {
            enabled = false;
            i += disableMatch[0].length - 1;
            continue;
        }

        
        const match = sequence.match(mulPattern);
        if (match) {
            i += match[0].length - 1;
            if (enabled) {
                const num1 = parseInt(match[1]);
                const num2 = parseInt(match[2]);

                sum += num1 * num2;
            }
        }
        i++;
    }

    console.log(sum);
} catch (error) {
    console.error('Error reading file:', error);
}
