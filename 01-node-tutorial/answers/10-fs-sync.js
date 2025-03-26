import { writeFileSync, readFileSync } from "node:fs";

writeFileSync("./temporary/fileA.txt", "Diversity\n");
writeFileSync("./temporary/fileA.txt", "Equity\n", { flag: "a" });
writeFileSync("./temporary/fileA.txt", "Inclusion\n", { flag: "a" });
const file = readFileSync("./temporary/fileA.txt", { encoding: "utf-8" });
console.log(file);
