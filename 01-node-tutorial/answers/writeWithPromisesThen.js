const { writeFile, readFile } = require("fs").promises;

writeFile("./temp.txt", "A\n", { encoding: "utf-8" })
  .then(() => {
    return writeFile("./temp.txt", "B\n", { encoding: "utf-8", flag: "a" });
  })
  .then(() => writeFile("./temp.txt", "C\n", { encoding: "utf-8", flag: "a" }))
  .then(() => writeFile("./temp.txt", "D\n", { encoding: "utf-8", flag: "a" }))
  .then(() => writeFile("./temp.txt", "E\n", { encoding: "utf-8", flag: "a" }))
  .catch((error) => {
    console.error("An error occured: ", error);
  });
