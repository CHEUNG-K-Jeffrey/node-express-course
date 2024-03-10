const EventEmitter = require("events");
const emitter = new EventEmitter();
setInterval(() => {
    emitter.emit("timer", "hi there");
    emitter.emit("request", "Hello");
    emitter.emit("error", "An error has occured!");
    emitter.emit("search", "JavaScript");
}, 2000);

emitter.on("timer", (msg) => console.log(msg));  
emitter.on("request", (msg) => console.log(msg));  
emitter.on("error", (msg) => console.error(msg));  
emitter.on("search", (msg) => console.log(`Searched for: ${msg}`));  
