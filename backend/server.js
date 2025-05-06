const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const database = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./utils/Logger");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Error handling middleware (must be after routes)
app.use(errorHandler);

// Start server if this file is run directly
if (require.main === module) {
  (async () => {
    await database.connect(); // ✅ Use Singleton database instance
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      logger.log(`Server running on port ${PORT}`);
    });
  })();
}

module.exports = app;
