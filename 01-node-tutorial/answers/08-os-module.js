import fs from "node:fs/promises";
import os from "node:os";
//@ts-check

console.log(
  await fs.readFile("./code_the_dream.utf8ans", { encoding: "utf-8" })
);

console.log("\x1b[25A");

console.log(`${os.userInfo().username}@${os.hostname()}`);
console.log("------------");
console.log(`OS: ${os.type()} ${os.machine()}`);
console.log(`Kernel: ${os.release()}`);

/**
 * Formats the unit word by singular or plural by adding an s.
 * Returns, for example, 5 apples or 1 apple or an empty string.
 * @param {number} number
 * @param {String} word
 * @returns {String}
 */
let formatUnit = (number, word) => {
  if (number > 1) {
    return `${number} ${word}s `;
  } else if (number > 0) {
    return `${number} ${word} `;
  } else {
    return "";
  }
};

const time = os.uptime();
const days = Math.trunc((time / 60 / 60 / 24) % 24);
const hours = Math.trunc((time / 60 / 60) % 60);
const minutes = Math.trunc((time / 60) % 60);
const seconds = time % 60;

console.log(
  `Uptime: ${formatUnit(days, "day")}${formatUnit(hours, "hour")}${formatUnit(
    minutes,
    "minute"
  )}${formatUnit(seconds, "second")}`
);
console.log(`Shell: ${os.userInfo().shell}`);

const cpus = os.cpus();
const cpu = os.cpus()[0];
console.log(`CPU: ${cpu.model} (${cpus.length}) @ ${cpu.speed} MHz`);

const availableMemory = (os.totalmem() - os.freemem()) / 1048576;
console.log(`Memory: ${availableMemory} MiB / ${os.totalmem() / 1048576} MiB`);

for (let i = 0; i < 8; i++) {
  console.log("\n");
}
