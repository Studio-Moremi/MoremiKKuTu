const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "server.log");

function cookelog(message, isError = false) {
  const now = new Date();
  const timestamp = now.toLocaleTimeString("en-US", { hour12: false });
  const logMessage = `[${timestamp}] ${message}`;

  if (isError) {
    console.error(`\x1b[31m${logMessage}\x1b[0m`);
  } else {
    console.log(logMessage);
  }

  fs.appendFileSync(logFilePath, logMessage + "\n", "utf8");
}

module.exports = cookelog;
