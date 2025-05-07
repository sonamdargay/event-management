const Event = require("../models/Event");
const { ErrorFactory } = require("../utils/ErrorFactory");

class EventService {
  // Create new event
  async addEvent(data, file) {
    const { eventName, description, fromDate, toDate, location, eventStatus } =
      data;

    const event = await Event.create({
      eventName,
      description,
      fromDate,
      toDate,
      location,
      eventStatus,
      featuredImage: file ? file.filename : "",
    });

    return event;
  }

  // Get all events
  async getEvents() {
    return await Event.find();
  }

  // Get event by ID
  async getEventById(id) {
    const event = await Event.findById(id);
    if (!event) {
      throw ErrorFactory.create("NotFoundError", "Event not found");
    }
    return event;
  }

  // Update event
  async updateEvent(id, data, file) {
    const event = await Event.findById(id);
    if (!event) {
      throw ErrorFactory.create("NotFoundError", "Event not found");
    }

    const { eventName, description, fromDate, toDate, location, eventStatus } =
      data;

    event.eventName = eventName || event.eventName;
    event.description = description || event.description;
    event.fromDate = fromDate || event.fromDate;
    event.toDate = toDate || event.toDate;
    event.location = location || event.location;
    event.eventStatus = eventStatus || event.eventStatus;

    if (file) {
      event.featuredImage = file.filename;
    }

    return await event.save();
  }

  // Delete event
  async deleteEvent(id) {
    const event = await Event.findById(id);
    if (!event) {
      throw ErrorFactory.create("NotFoundError", "Event not found");
    }

    await event.remove();
    return { message: "Event deleted" };
  }
}

module.exports = new EventService();
