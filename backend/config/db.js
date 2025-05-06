const mongoose = require("mongoose");
const logger = require("../utils/Logger");

class Database {
  constructor() {
    if (!Database.instance) {
      this._connection = null; // Use an underscored property to avoid conflicts
      Database.instance = this;
    }
    return Database.instance;
  }

  async connect() {
    if (this._connection) {
      logger.log("Using existing MongoDB connection");
      return this._connection;
    }

    try {
      this._connection = await mongoose.connect(process.env.MONGO_URI);
      logger.log("MongoDB connected successfully");
      return this._connection;
    } catch (error) {
      logger.error("MongoDB connection error: " + error.message);
      process.exit(1);
    }
  }
}

const databaseInstance = new Database();

module.exports = databaseInstance;
