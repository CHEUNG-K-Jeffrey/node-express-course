//@ts-check
const names = require("./04-names.js");
const sleep = require("./05-utils.js");
const other = require("./06-alternative-flavor.js");

(async () => {
  console.log(names.default.action, names.default.video);
  await sleep.default(3000);
  require("./07-mind-grenade.js");
  console.log(other.action, other.video);
})();
