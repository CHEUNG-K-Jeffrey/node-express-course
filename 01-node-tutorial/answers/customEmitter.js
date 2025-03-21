const EventEmitter = require("events");
const emitter = new EventEmitter();
setInterval(() => {
  emitter.emit("time", "hi there");
}, 1000);
emitter.on("time", (msg) => console.log(`Time: ${new Date()}`));
