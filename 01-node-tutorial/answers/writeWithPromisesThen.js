const { writeFile, readFile } = require("fs").promises;

writeFile("temp.txt", "line 1\n", {flag: "w"})
.then(() => {
    return writeFile("temp.txt", "line 2\n", {flag: "a"});
})
.then(() => {
    return writeFile("temp.txt", "line 3\n", {flag: "a"});
})
.catch((error) => {
    console.log("An error occurred: ", error);
})