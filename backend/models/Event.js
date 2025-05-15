const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  location: { type: String, required: true },
  eventStatus: { type: String, enum: ["Draft", "Published"], default: "Draft" },
  featuredImage: { type: String },
  isPaid: { type: Boolean, default: false },
  price: {
    type: Number,
    required: function () {
      return this.isPaid === true;
    },
    min: 1,
  },
});

module.exports = mongoose.model("Event", EventSchema);
