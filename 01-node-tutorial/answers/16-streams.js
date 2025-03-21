const fs = require("fs");

let chunkCount = 0;
const fileStream = fs.createReadStream("../content/big.txt", {
  encoding: "utf-8",
  highWaterMark: 200,
});

fileStream.on("data", (stream) => {
  chunkCount++;
  console.log(stream);
});

fileStream.on("end", () => {
  console.log(`Chunks received: ${chunkCount}`);
});

fileStream.on("error", (error) => {
  console.error(error);
});
