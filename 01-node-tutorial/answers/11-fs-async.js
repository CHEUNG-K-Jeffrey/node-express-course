import util from "node:util";
import fs from "node:fs";

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

try {
  console.log("point 1");
  await writeFile("./temporary/output.txt", "test");
  console.log("point 2");
  await writeFile("./temporary/output.txt", "fast", { flag: "a" });
  console.log("point 3");
  await writeFile("./temporary/output.txt", "es", { flag: "a" });
  console.log("point 4");
  console.log(await readFile("./temporary/output.txt", { encoding: "utf-8" }));
} catch (error) {
  console.error(error);
}
