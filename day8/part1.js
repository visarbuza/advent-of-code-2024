(async () => {
    try {
        const input = await readStdin();
        

        console.log(input);
    } catch (error) {
        console.error('Error reading input:', error);
    }
})();

async function readStdin() {
    return new Promise((resolve, reject) => {
        let input = '';
        process.stdin.on('data', (chunk) => {
            input += chunk;
        });
        process.stdin.on('end', () => {
            resolve(input);
        });
        process.stdin.on('error', (err) => {
            reject(err);
        });
    });
}