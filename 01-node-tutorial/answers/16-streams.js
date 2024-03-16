const fs = require("node:fs");

let counter = 0;
const readStream = fs.createReadStream("../content/big.txt", { encoding: "utf-8", highWaterMark: 200 });

readStream.on('data', (chunk) => {
    counter++;
    console.log(chunk);
});

readStream.on('end', () => {
    console.log(`Chunks received: ${counter}`);
});

readStream.on('error', (error) => {
    console.error(error);
});
