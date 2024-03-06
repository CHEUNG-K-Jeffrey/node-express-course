const names = require("./04-names.js");
const utils = require("./05-utils.js");
const alternativeFlavor = require("./06-alternative-flavor.js");

console.log(`${names.myDog.emoji} ${names.myDog.name} is a ${names.myDog.breed}.`);
console.log(`${names.myFood.emoji} ${names.myFood.name} is ${names.myFood.color}.`)

utils.greetUser();
console.log(alternativeFlavor.foods.reduce((prevValue, currentValue) => prevValue + currentValue, ""));
console.log(alternativeFlavor.electronics.reduce((i, j) => i + j, ""));

const mindGrenade = require("./07-mind-grenade.js");