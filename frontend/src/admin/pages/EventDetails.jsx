import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import GreetingCard from "../components/GreetingCard";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";
import EventModal from "../components/EventModal";

const EventDetails = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const [showModal, setShowModal] = useState(false);

  // Example event data
  const [event, setEvent] = useState({
    name: "This is a test event",
    description:
      "This is an event that I don't want to share details because I am too bored to type and I don't like using Lorem Ipsum as a place holder.",
    from: "21/09/2023 12:00PM",
    to: "21/09/2023 03:00PM",
    image: "/path-to-event-image.jpg",
    attendees: 12,
  });

  const handleModalSubmit = (updatedEvent) => {
    console.log("Updated Event:", updatedEvent);

    // Update the event data
    setEvent((prev) => ({
      ...prev,
      ...updatedEvent,
      // If no new image was provided, keep the old one
      image: updatedEvent.image
        ? URL.createObjectURL(updatedEvent.image)
        : prev.image,
    }));
  };

  return (
    <div className="d-flex">
      {sidebarVisible && <Sidebar />}
      <div className="flex-grow-1">
        <Topbar onToggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
        <div className="p-4 bg-light" style={{ minHeight: "100vh" }}>
          <GreetingCard
            title="Event Details"
            subtitle="We are on a mission to help developers like you to build beautiful projects for FREE."
          />
          <FilterBar />

          <div className="bg-white rounded p-4 shadow-sm">
            <h5>Your Events</h5>
            <p>
              <i className="bi bi-check2-circle text-primary"></i>{" "}
              {event.attendees} Confirmed attendees
            </p>

            <div className="row">
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label fw-bold">Event Name:</label>
                  <p>{event.name}</p>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Description of Event:
                  </label>
                  <p>{event.description}</p>
                </div>

                <div className="mb-3 d-flex gap-3">
                  <div>
                    <label className="form-label fw-bold">From:</label>
                    <p>{event.from}</p>
                  </div>
                  <div>
                    <label className="form-label fw-bold">To:</label>
                    <p>{event.to}</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 text-center">
                <img
                  src={event.image}
                  alt="Event"
                  className="img-fluid rounded mb-3"
                />
                <button
                  className="btn btn-primary rounded-pill"
                  onClick={() => setShowModal(true)}
                >
                  Update Event
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Reusable Modal */}
      <EventModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleModalSubmit}
        eventData={event}
      />
    </div>
  );
};

export default EventDetails;
