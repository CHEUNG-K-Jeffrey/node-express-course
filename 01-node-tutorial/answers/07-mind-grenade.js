//@ts-check
import fs from "node:fs/promises";
import sleep from "./05-utils.js";

console.log("It loads the module!");

// require does not support async ES modules
(async () => {
  const file = await fs.readFile("./sunset.txt", { encoding: "utf-8" });
  for (let line of file.split("\n")) {
    console.log(line);
    await sleep(40);
  }
})();
