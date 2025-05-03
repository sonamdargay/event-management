const express = require("express");
const {
  getEvents,
  getEventById,
  addEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/";
    // Check if folder exists, if not create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router
  .route("/")
  .get(protect, getEvents)
  .post(protect, upload.single("featuredImage"), addEvent);

router
  .route("/:id")
  .get(protect, getEventById)
  .put(protect, upload.single("featuredImage"), updateEvent)
  .delete(protect, deleteEvent);

module.exports = router;
