const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const database = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./utils/Logger");
const http = require("http");
const socketIo = require("socket.io");
const eventRegistrationRoutes = require('./routes/eventRegistration');


dotenv.config();

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})
global.io = io;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use('/api/event-registration', eventRegistrationRoutes);

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Error handling middleware (must be after routes)
app.use(errorHandler);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
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

module.exports ={app, io};
