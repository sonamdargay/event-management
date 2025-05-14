const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");

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
      req.file = { originalname: "image.jpg", buffer: Buffer.from("dummy") };

      const createdEvent = { _id: "abc123", ...req.body };

      sinon.stub(eventService, "addEvent").resolves(createdEvent);

      await eventController.addEvent(req, res, next);

      expect(res.status.calledOnceWith(201)).to.be.true;
      expect(res.json.calledOnceWith(createdEvent)).to.be.true;
      expect(next.notCalled).to.be.true;
    });

    it("should call next on error", async () => {
      const error = new Error("Service error");
      sinon.stub(eventService, "addEvent").rejects(error);

      await eventController.addEvent(req, res, next);

      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe("getEvents", () => {
    it("should return all events", async () => {
      const mockEvents = [
        { _id: "1", eventName: "A" },
        { _id: "2", eventName: "B" },
      ];
      sinon.stub(eventService, "getEvents").resolves(mockEvents);

      await eventController.getEvents(req, res, next);

      expect(res.json.calledOnceWith(mockEvents)).to.be.true;
      expect(next.notCalled).to.be.true;
    });

    it("should call next on error", async () => {
      const error = new Error("DB error");
      sinon.stub(eventService, "getEvents").rejects(error);

      await eventController.getEvents(req, res, next);

      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe("getEventById", () => {
    it("should return a specific event", async () => {
      req.params = { id: "123" };
      const mockEvent = { _id: "123", eventName: "Special Event" };

      sinon.stub(eventService, "getEventById").resolves(mockEvent);

      await eventController.getEventById(req, res, next);

      expect(res.json.calledOnceWith(mockEvent)).to.be.true;
      expect(next.notCalled).to.be.true;
    });

    it("should call next on error", async () => {
      req.params = { id: "invalid" };
      const error = new Error("Not found");

      sinon.stub(eventService, "getEventById").rejects(error);

      await eventController.getEventById(req, res, next);

      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe("updateEvent", () => {
    it("should update an event", async () => {
      req.params = { id: "456" };
      req.body = { eventName: "Updated Event" };
      req.file = { originalname: "update.jpg", buffer: Buffer.from("content") };

      const updatedEvent = { _id: "456", ...req.body };

      sinon.stub(eventService, "updateEvent").resolves(updatedEvent);

      await eventController.updateEvent(req, res, next);

      expect(res.json.calledOnceWith(updatedEvent)).to.be.true;
      expect(next.notCalled).to.be.true;
    });

    it("should call next on error", async () => {
      req.params = { id: "456" };
      const error = new Error("Update failed");

      sinon.stub(eventService, "updateEvent").rejects(error);

      await eventController.updateEvent(req, res, next);

      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe("deleteEvent", () => {
    it("should delete an event", async () => {
      req.params = { id: "789" };
      const result = { message: "Event deleted" };

      sinon.stub(eventService, "deleteEvent").resolves(result);

      await eventController.deleteEvent(req, res, next);

      expect(res.json.calledOnceWith(result)).to.be.true;
      expect(next.notCalled).to.be.true;
    });

    it("should call next on error", async () => {
      req.params = { id: "789" };
      const error = new Error("Delete failed");

      sinon.stub(eventService, "deleteEvent").rejects(error);

      await eventController.deleteEvent(req, res, next);

      expect(next.calledOnceWith(error)).to.be.true;
    });
  });
});
