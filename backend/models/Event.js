const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  location: { type: String, required: true },
  eventStatus: { type: String, enum: ["Published", "Draft"], default: "Draft" }, // 👈 Added this line
  featuredImage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", EventSchema);
