const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const database = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./utils/Logger");
const http = require("http");
const socketIo = require("socket.io");
const eventRegistrationRoutes = require("./routes/eventRegistration");
const path = require("path");
const fs = require("fs");
const readline = require("readline");

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
global.io = io;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/event-registration", eventRegistrationRoutes);

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Route to fetch logs
app.get("/api/logs", async (req, res) => {
  try {
    const logFilePath = path.join(__dirname, "logs", "app.log");
    const lines = await readLastLines(logFilePath, 10);
    res.json({ logs: lines });
  } catch (err) {
    res.status(500).json({ message: "Unable to read log file" });
  }
});

// Helper function to read last n lines
const readLastLines = (filePath, maxLines) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath, { encoding: "utf8" });
    const rl = readline.createInterface({ input: readStream });
    const logsArray = [];

    rl.on("line", (line) => {
      if (line.trim()) {
        logsArray.push(line);
        if (logsArray.length > maxLines) {
          logsArray.shift(); // maintain only last 'maxLines' lines
        }
      }
    });

    rl.on("error", reject);
    rl.on("close", () => resolve(logsArray));
  });
};

// Error handling middleware (must be after routes)
app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server if this file is run directly
if (require.main === module) {
  (async () => {
    await database.connect(); // ✅ Use Singleton database instance
    const PORT = process.env.PORT || 5001;
    server.listen(PORT, () => {
      logger.log(`Server running on port ${PORT}`);
    });
  })();
}

module.exports = { app, io };
