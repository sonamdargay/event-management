import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import GreetingCard from "../components/GreetingCard";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";
import EventModal from "../components/EventModal";
import axiosInstance from "../../axiosConfig";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = axiosInstance.defaults.baseURL;
const EventDetails = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState(null); // Starts empty
  const { eventId } = useParams(); // Get the event ID from URL
  const { user } = useAuth();

  // 🔥 Fetch event details when component mounts or eventId changes
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(`/api/events/${eventId}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setEvent(response.data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    };

    if (eventId && user?.token) {
      fetchEvent();
    }
  }, [eventId, user]);
  if (!event) {
    return <p>Loading event details...</p>;
  }
  return (
    <div className="d-flex">
      {sidebarVisible && <Sidebar />}
      <div className="flex-grow-1">
        <Topbar onToggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
        <div className="p-4 bg-light" style={{ minHeight: "100vh" }}>
          <GreetingCard
            title="Event Details"
            subtitle="View and update your event information."
          />
          <FilterBar />

          <div className="bg-white rounded p-4 shadow-sm">
            <h5>Your Event</h5>
            <p>
              <i className="bi bi-check2-circle text-primary"></i>{" "}
              {event.attendees ? event.attendees.length : 0} Confirmed attendees
            </p>

            <div className="row">
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label fw-bold">Event Name:</label>
                  <p>{event.eventName}</p>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Description:</label>
                  <p>{event.description}</p>
                </div>

                <div className="mb-3 d-flex gap-3">
                  <div>
                    <label className="form-label fw-bold">From:</label>
                    <p>
                      {event.fromDate
                        ? new Date(event.fromDate).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <label className="form-label fw-bold">To:</label>
                    <p>
                      {event.toDate
                        ? new Date(event.toDate).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Status:</label>
                  <p>{event.eventStatus || "Draft"}</p>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Location:</label>
                  <p>{event.location}</p>
                </div>
              </div>

              <div className="col-md-4 text-center">
                {event.featuredImage ? (
                  <img
                    src={
                      event.featuredImage
                        ? `${BASE_URL}/uploads/${event.featuredImage}`
                        : "/placeholder.jpg"
                    }
                    alt="Event"
                    className="img-fluid rounded mb-3"
                    style={{ maxWidth: "300px", width: "100%", height: "auto" }}
                  />
                ) : (
                  <p>No image uploaded.</p>
                )}
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

      {/* Event Modal for editing */}
      <EventModal
        show={showModal}
        onClose={() => setShowModal(false)}
        events={[]} // No need for events list here
        setEvents={() => {}} // Dummy since we're only editing single event
        editingEvent={event}
        setEditingEvent={setEvent}
      />
    </div>
  );
};

export default EventDetails;
