const Event = require("../models/Event");

// CREATE EVENT
const addEvent = async (req, res) => {
  const {
    eventName,
    description,
    fromDate,
    toDate,
    location,
    eventStatus, // Accept status from the body
  } = req.body;

  try {
    const event = await Event.create({
      eventName,
      description,
      fromDate,
      toDate,
      location,
      eventStatus,
      featuredImage: req.file ? req.file.filename : "", // If image uploaded
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Add Event Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL EVENTS
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error("Get Events Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE EVENT BY ID (for EventDetails page)
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error("Get Event By ID Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE EVENT
const updateEvent = async (req, res) => {
  const { eventName, description, fromDate, toDate, location, eventStatus } =
    req.body;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.eventName = eventName || event.eventName;
    event.description = description || event.description;
    event.fromDate = fromDate || event.fromDate;
    event.toDate = toDate || event.toDate;
    event.location = location || event.location;
    event.eventStatus = eventStatus || event.eventStatus;

    if (req.file) {
      event.featuredImage = req.file.filename;
    }

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    console.error("Update Event Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE EVENT
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.remove();
    res.json({ message: "Event deleted" });
  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Export all controllers
module.exports = {
  getEvents,
  getEventById, // IMPORTANT: for viewing event details
  addEvent,
  updateEvent,
  deleteEvent,
};
