const fs = require("fs");
fs.writeFileSync("./temporary/fileA.txt",
    "Lorem ipsum dolor sit amet, " +
    "consectetur adipiscing elit, " +
    "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n",
    { flag: "w" });
fs.writeFileSync("./temporary/fileA.txt",
    "Dolor sit amet consectetur adipiscing elit.\n",
    { flag: "a" });
fs.writeFileSync("./temporary/fileA.txt",
    "Ut etiam sit amet nisl purus in mollis nunc.\n",
    { flag: "a" });

const contents = fs.readFileSync("./temporary/fileA.txt", {encoding: "ascii"});

console.log(contents);