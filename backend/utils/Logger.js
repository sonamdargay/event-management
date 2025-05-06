// utils/Logger.js
// Logger utility for logging messages to console and file
// This Logger class implements the Singleton pattern to ensure only one instance exists
const fs = require("fs");
const path = require("path");

class Logger {
  constructor() {
    if (!Logger.instance) {
      Logger.instance = this;
      this.logFile = path.join(__dirname, "../logs/app.log");
      if (!fs.existsSync(path.dirname(this.logFile))) {
        fs.mkdirSync(path.dirname(this.logFile));
      }
    }
    return Logger.instance;
  }

  log(message) {
    const msg = `[LOG] ${new Date().toISOString()}: ${message}\n`;
    console.log(msg);
    fs.appendFileSync(this.logFile, msg);
  }

  error(message) {
    const msg = `[ERROR] ${new Date().toISOString()}: ${message}\n`;
    console.error(msg);
    fs.appendFileSync(this.logFile, msg);
  }

  warn(message) {
    const msg = `[WARN] ${new Date().toISOString()}: ${message}\n`;
    console.warn(msg);
    fs.appendFileSync(this.logFile, msg);
  }
}

const logger = new Logger();
Object.freeze(logger);

module.exports = logger;
