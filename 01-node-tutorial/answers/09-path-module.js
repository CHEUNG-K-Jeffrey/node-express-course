import path from "node:path";
import os from "node:os";

switch (os.platform) {
  case "win32":
    console.log(path.join("C:/Users/", os.userInfo()));
    break;
  default:
    console.log(path.join("/home/", os.userInfo()?.username));
}
