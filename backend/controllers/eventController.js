const eventService = require("../services/EventService");
const logger = require("../utils/Logger"); // Import the logger singleton

class EventController {
  // Create event
  async addEvent(req, res, next) {
    try {
      const event = await eventService.addEvent(req.body, req.file);
      res.status(201).json(event);
      logger.log(`Event created: ${event.eventName} (ID: ${event._id})`);
    } catch (error) {
      logger.error(`Failed to create event: ${error.message}`);
      next(error); // pass error to errorHandler middleware
    }
  }

  // Get all events
  async getEvents(req, res, next) {
    try {
      const events = await eventService.getEvents();
      res.json(events);
      logger.log(`Fetched all events (Total: ${events.length})`);
    } catch (error) {
      logger.error(`Failed to fetch events: ${error.message}`);
      next(error);
    }
  }

  // Get event by ID
  async getEventById(req, res, next) {
    try {
      const event = await eventService.getEventById(req.params.id);
      res.json(event);
      logger.log(`Fetched event by ID: ${req.params.id}`);
    } catch (error) {
      logger.error(
        `Failed to fetch event with ID ${req.params.id}: ${error.message}`
      );
      next(error);
    }
  }

  // Update event
  async updateEvent(req, res, next) {
    try {
      const updatedEvent = await eventService.updateEvent(
        req.params.id,
        req.body,
        req.file
      );
      res.json(updatedEvent);
      logger.log(
        `Event updated: ${updatedEvent.eventName} (ID: ${req.params.id})`
      );
    } catch (error) {
      logger.error(
        `Failed to update event with ID ${req.params.id}: ${error.message}`
      );
      next(error);
    }
  }

  // Delete event
  async deleteEvent(req, res, next) {
    try {
      const result = await eventService.deleteEvent(req.params.id);
      res.json(result);
      logger.log(`Event deleted (ID: ${req.params.id})`);
    } catch (error) {
      logger.error(
        `Failed to delete event with ID ${req.params.id}: ${error.message}`
      );
      next(error);
    }
  }
}

module.exports = new EventController();
