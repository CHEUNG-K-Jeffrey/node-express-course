import fs from "node:fs/promises";

// @ts-check
/**
 * This is a JSDoc comment describing the function.
 * JSDoc allows basic typing of JavaScript in the comments.
 *
 * @argument {number} durationInMilliseconds
 */
let sleep = async (durationInMilliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, durationInMilliseconds);
  });
};
(async () => {
  console.log(await fs.readFile("./bridge.utf8ans", { encoding: "utf-8" }));
  console.log(`Hello!\n`);

  await sleep(3000);

  console.log(
    `I'm \x1b[36;1;1mJeffrey Cheung.\x1b[0m As a Code The Dream student,`,
    `I'm excited and eager to get\nstarted on becoming a professional Software Engineer.`,
    `I hope you liked the ANSI\nart of the Golden Gate Bridge. Looking forward to working with you!`
  );

  await sleep(3000);

  console.log(
    "Here is my LinkedIn:\n\x1b[36;1;1mhttps://www.linkedin.com/in/cheung-k-jeffrey/\x1b[0m"
  );
})();
