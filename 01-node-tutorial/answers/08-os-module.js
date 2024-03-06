const os = require("os");
console.log(`Welcome, ${os.userInfo().username}!`);
console.log(`You are running ${os.type()} ${os.release()} ${os.machine()} on your ${os.hostname()}.`);
const time = os.uptime()
const days = Math.trunc(time/60/60/24%24);
const hours = Math.trunc(time/60/60%60);
const minutes = Math.trunc(time/60%60);
const seconds = time%60;
console.log(`Your ${os.hostname()} has been running for ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);