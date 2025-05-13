const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");

const app = require("../server");
const eventController = require("../controllers/eventController");
const eventService = require("../services/EventService");

const { expect } = chai;
chai.use(chaiHttp);

describe("EventController Tests", () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("addEvent", () => {
    it("should create a new event successfully", async () => {
      req.body = {
        eventName: "Test Event",
        description: "A test description",
        date: "2025-12-31",
        location: "Thimphu",
      };

      const createdEvent = { _id: "abc123", ...req.body };

      sinon.stub(eventService, "addEvent").resolves(createdEvent);

      await eventController.addEvent(req, res, next);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(createdEvent)).to.be.true;
      expect(next.called).to.be.false;
    });

    it("should call next on error", async () => {
      const error = new Error("Service error");
      sinon.stub(eventService, "addEvent").rejects(error);

      await eventController.addEvent(req, res, next);

      expect(next.calledWith(error)).to.be.true;
    });
  });

  describe("getEvents", () => {
    it("should return all events", async () => {
      const mockEvents = [
        { _id: "1", eventName: "Tech Conf" },
        { _id: "2", eventName: "Hackathon" },
      ];

      sinon.stub(eventService, "getEvents").resolves(mockEvents);

      await eventController.getEvents(req, res, next);

      expect(res.json.calledWith(mockEvents)).to.be.true;
      expect(next.called).to.be.false;
    });

    it("should call next on error", async () => {
      const error = new Error("Failed to fetch");
      sinon.stub(eventService, "getEvents").rejects(error);

      await eventController.getEvents(req, res, next);

      expect(next.calledWith(error)).to.be.true;
    });
  });

  describe("getEventById", () => {
    it("should return an event by ID", async () => {
      req.params = { id: "abc123" };
      const mockEvent = { _id: "abc123", eventName: "Test Event" };

      sinon.stub(eventService, "getEventById").resolves(mockEvent);

      await eventController.getEventById(req, res, next);

      expect(res.json.calledWith(mockEvent)).to.be.true;
    });

    it("should call next on error", async () => {
      req.params = { id: "invalid" };
      const error = new Error("Not Found");

      sinon.stub(eventService, "getEventById").rejects(error);

      await eventController.getEventById(req, res, next);

      expect(next.calledWith(error)).to.be.true;
    });
  });

  describe("updateEvent", () => {
    it("should update an event", async () => {
      req.params = { id: "abc123" };
      req.body = {
        eventName: "Updated Event",
        description: "Updated Desc",
        date: "2025-06-01",
        location: "Updated City",
      };

      const updatedEvent = { _id: "abc123", ...req.body };

      sinon.stub(eventService, "updateEvent").resolves(updatedEvent);

      await eventController.updateEvent(req, res, next);

      expect(res.json.calledWith(updatedEvent)).to.be.true;
    });

    it("should call next on error", async () => {
      req.params = { id: "abc123" };
      const error = new Error("Update failed");

      sinon.stub(eventService, "updateEvent").rejects(error);

      await eventController.updateEvent(req, res, next);

      expect(next.calledWith(error)).to.be.true;
    });
  });

  describe("deleteEvent", () => {
    it("should delete an event", async () => {
      req.params = { id: "abc123" };
      const result = { message: "Event deleted" };

      sinon.stub(eventService, "deleteEvent").resolves(result);

      await eventController.deleteEvent(req, res, next);

      expect(res.json.calledWith(result)).to.be.true;
    });

    it("should call next on error", async () => {
      req.params = { id: "abc123" };
      const error = new Error("Delete failed");

      sinon.stub(eventService, "deleteEvent").rejects(error);

      await eventController.deleteEvent(req, res, next);

      expect(next.calledWith(error)).to.be.true;
    });
  });
});
