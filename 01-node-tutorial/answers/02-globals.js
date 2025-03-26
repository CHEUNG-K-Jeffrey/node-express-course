import fs from "node:fs/promises";

//@ts-check

console.log(import.meta.dirname);
console.log(process.env.MY_VAR);

let sleep = async (durationInMilliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, durationInMilliseconds);
  });
};

if (process.env.MY_VAR === "🍔") {
  console.log("Here, have an ANSI 🍔.");
  await sleep(1000);
  console.log(await fs.readFile("./hamburger.utf8ans", { encoding: "utf-8" }));
}
