const fs = require('fs');

try {
    // Read entire file as a string
    const pattern = /^mul\((\d{1,3}),(\d{1,3})\)/;
    const data = fs.readFileSync('input.txt', 'utf8');
    const str = data.trim();
    let sum = 0;

    for (let i = 0; i < str.length; i++) {
        const sequence = str.slice(i, str.length);
        const match = sequence.match(pattern);
        if (match) {
            i += match[0].length - 1;
            const num1 = parseInt(match[1]);
            const num2 = parseInt(match[2]);

            sum += num1 * num2;
        }
    }

    console.log(sum);
} catch (error) {
    console.error('Error reading file:', error);
}
