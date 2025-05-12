import { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import { useAuth } from "../../context/AuthContext";
import ActionButtons from "./ActionButtons";
import EventModal from "./EventModal";

const EventTable = () => {
  const [events, setEvents] = useState([]); // Initially empty
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const { user } = useAuth();

  // ✅ Fetch events from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/api/events", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setEvents(response.data); // Update state with fetched events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (user?.token) {
      fetchEvents();
    }
  }, [user]);

  const handleAddNew = () => {
    setEditingEvent(null);
    setShowModal(true);
  };

  const handleModalSubmit = (newEventData) => {
    // Update state when a new event is added or updated
    if (editingEvent) {
      setEvents(
        events.map((ev) => (ev._id === newEventData._id ? newEventData : ev))
      );
    } else {
      setEvents([...events, newEventData]);
    }
  };

  return (
    <div className="p-3 bg-white rounded shadow-sm">
      <div className="row">
        <div className="col-md-8">
          <h5>Your Events</h5>
          <p>
            <i className="bi bi-check2-circle text-primary"></i> {events.length}{" "}
            Events in total
          </p>
        </div>
        <div className="col-md-4 text-end">
          <button
            className="btn btn-secondary rounded-pill"
            onClick={handleAddNew}
          >
            Add New
          </button>
        </div>
      </div>

      <table className="table align-middle table-hover">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Attendees</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Event Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.eventName}</td>
              <td>
                {event.attendees && event.attendees.length > 0
                  ? event.attendees.map((a, idx) => (
                      <span
                        key={idx}
                        className="px-2 border rounded-circle me-1"
                      >
                        {a}
                      </span>
                    ))
                  : "-"}
              </td>
              <td>
                {event.fromDate
                  ? new Date(event.fromDate).toLocaleDateString()
                  : "-"}
              </td>
              <td>
                {event.toDate
                  ? new Date(event.toDate).toLocaleDateString()
                  : "-"}
              </td>
              <td>{event.eventStatus || "Draft"}</td>
              <td>
                <ActionButtons
                  event={event}
                  onEdit={() => {
                    setEditingEvent(event);
                    setShowModal(true);
                  }}
                  events={events}
                  setEvents={setEvents}
                  // Delete functionality can be wired here too
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EventModal
        show={showModal}
        onClose={() => setShowModal(false)}
        events={events}
        setEvents={setEvents}
        editingEvent={editingEvent}
        setEditingEvent={setEditingEvent}
      />
    </div>
  );
};

export default EventTable;
