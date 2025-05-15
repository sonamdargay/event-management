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
  const { eventId } = useParams();
  const { user } = useAuth();

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Load single event if eventId present
  useEffect(() => {
    if (eventId && user?.token) {
      axiosInstance
        .get(`/api/events/${eventId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => setEvent(res.data))
        .catch((err) => console.error("Failed to load event:", err));
    }
  }, [eventId, user]);

  // Load all events if no eventId
  useEffect(() => {
    if (!eventId && user?.token) {
      axiosInstance
        .get("/api/events", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => setEvents(res.data))
        .catch((err) => console.error("Failed to load events:", err));
    }
  }, [eventId, user]);

  const filteredEvents = events.filter((ev) => {
    const matchName = ev.eventName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchStatus =
      filterStatus === "Paid"
        ? ev.isPaid
        : filterStatus === "Free"
        ? !ev.isPaid
        : true;

    return matchName && matchStatus;
  });

  const handleReset = () => {
    setSearchTerm("");
    setFilterStatus("");
  };

  return (
    <div className="d-flex">
      {sidebarVisible && <Sidebar />}
      <div className="flex-grow-1">
        <Topbar onToggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
        <div className="p-4 bg-light" style={{ minHeight: "100vh" }}>
          {/* Single Event View */}
          {eventId && event ? (
            <>
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
                      <p>{event.eventStatus}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Location:</label>
                      <p>{event.location}</p>
                    </div>
                  </div>

                  <div className="col-md-4 text-center">
                    {event.featuredImage ? (
                      <img
                        src={`${BASE_URL}/uploads/${event.featuredImage}`}
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

              {/* Edit Modal */}
              <EventModal
                show={showModal}
                onClose={() => setShowModal(false)}
                events={[]} setEvents={() => {}}
                editingEvent={event}
                setEditingEvent={setEvent}
              />
            </>
          ) : (
            // All Events Listing Page
            <>
              <GreetingCard title="All Events" subtitle="Browse all created events" />

              {/* Filters */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                  type="text"
                  className="form-control w-25"
                  placeholder="Search by event name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="d-flex gap-3">
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      Sort By
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="dropdown-item" onClick={() => setFilterStatus("Paid")}>
                          Paid
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => setFilterStatus("Free")}>
                          Free
                        </button>
                      </li>
                    </ul>
                  </div>

                  <button className="btn btn-outline-dark" onClick={handleReset}>
                    <i className="bi bi-arrow-clockwise me-1"></i> Reset
                  </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded shadow-sm">
                <h5>Your Events</h5>
                <p>
                  <i className="bi bi-check2-circle text-primary"></i>{" "}
                  {filteredEvents.length} events found
                </p>

                <table className="table align-middle table-hover">
                  <thead>
                    <tr>
                      <th>Event Name</th>
                      <th>Attendees</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Status</th>
                      <th>Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((ev, idx) => (
                      <tr key={idx}>
                        <td>{ev.eventName}</td>
                        <td>{ev.attendees || 0}</td>
                        <td>{ev.fromDate ? new Date(ev.fromDate).toLocaleDateString() : "-"}</td>
                        <td>{ev.toDate ? new Date(ev.toDate).toLocaleDateString() : "-"}</td>
                        <td>{ev.eventStatus}</td>
                        <td>{ev.isPaid ? "Paid" : "Free"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredEvents.length === 0 && (
                  <p className="text-muted text-center mt-4">No events found.</p>
                )}
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default EventDetails;
