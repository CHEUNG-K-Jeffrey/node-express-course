const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  try {
    await writeFile("./temp.txt", "Hello\nNode.js\nWorld!", {
      encoding: "utf-8",
    });
  } catch (err) {
    console.error(err);
  }
};

const reader = async () => {
  try {
    const file = await readFile("./temp.txt", { encoding: "utf-8" });
    console.log(file);
  } catch (err) {
    console.error(err);
  }
};

const readWrite = async () => {
  await writer();
  await reader();
};

readWrite();
