const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
    try {
        await writeFile("temp.txt", "Line 1\n", { flag: "w" });
        await writeFile("temp.txt", "Line 2\n", { flag: "a" });
        await writeFile("temp.txt", "Line 3\n", { flag: "a" });

    } catch (err) {
        console.err(err);
    }
}

const reader = async () => {
    console.log(await readFile("temp.txt", { encoding: "utf-8" }));
}

const readWrite = async () => {
    await writer();
    await reader();
}

readWrite();