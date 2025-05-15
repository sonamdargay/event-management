const mongoose = require("mongoose");
const Event = require("../models/Event");
const EventRegistration = require("../models/EventRegistration");
const { ErrorFactory } = require("../utils/ErrorFactory");

class EventService {
  // Get all events with attendee count
  async getEvents() {
    const events = await Event.find();

    const eventsWithAttendees = await Promise.all(
      events.map(async (event) => {
        const count = await EventRegistration.countDocuments({
          eventId: mongoose.Types.ObjectId(event._id),
        });

        return {
          ...event._doc,
          attendees: count,
        };
      })
    );

    return eventsWithAttendees;
  }

  async addEvent(data, file) {
    const {
      eventName,
      description,
      fromDate,
      toDate,
      location,
      eventStatus,
      isPaid,
      price,
    } = data;

    const event = await Event.create({
      eventName,
      description,
      fromDate,
      toDate,
      location,
      eventStatus,
      isPaid: isPaid === "true" || isPaid === true,
      price:
        isPaid === "true" || isPaid === true
          ? Number(price)
          : undefined,
      featuredImage: file ? file.filename : "",
    });

    return event;
  }

  async getEventById(id) {
    const event = await Event.findById(id);
    if (!event) {
      throw ErrorFactory.create("NotFoundError", "Event not found");
    }
    return event;
  }

  async updateEvent(id, data, file) {
    const event = await Event.findById(id);
    if (!event) {
      throw ErrorFactory.create("NotFoundError", "Event not found");
    }

    const {
      eventName,
      description,
      fromDate,
      toDate,
      location,
      eventStatus,
      isPaid,
      price,
    } = data;

    event.eventName = eventName || event.eventName;
    event.description = description || event.description;
    event.fromDate = fromDate || event.fromDate;
    event.toDate = toDate || event.toDate;
    event.location = location || event.location;
    event.eventStatus = eventStatus || event.eventStatus;
    event.isPaid = isPaid === "true" || isPaid === true;
    event.price =
      isPaid === "true" || isPaid === true
        ? Number(price)
        : undefined;

    if (file) {
      event.featuredImage = file.filename;
    }

    return await event.save();
  }

  async deleteEvent(id) {
    const event = await Event.findById(id);
    if (!event) {
      throw ErrorFactory.create("NotFoundError", "Event not found");
    }

    await event.remove();
    return { message: "Event deleted" };
  }

  async registerUserToEvent(data) {
    const registration = new EventRegistration(data);
    return await registration.save();
  }
}

module.exports = new EventService();
