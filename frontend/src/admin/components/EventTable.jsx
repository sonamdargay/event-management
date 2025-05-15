import { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import { useAuth } from "../../context/AuthContext";
import ActionButtons from "./ActionButtons";
import EventModal from "./EventModal";

const EventTable = ({ filterStatus, searchTerm }) => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/api/events", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setEvents(response.data);
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

  // ✅ Combine both Paid/Free filter and search term
  const filteredEvents = events.filter((ev) => {
    const matchesStatus = filterStatus
      ? filterStatus === "Paid"
        ? ev.isPaid
        : !ev.isPaid
      : true;

    const matchesSearch = ev.eventName
      .toLowerCase()
      .includes(searchTerm?.toLowerCase() || "");

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-3 bg-white rounded shadow-sm">
      <div className="row">
        <div className="col-md-8">
          <h5>Your Events</h5>
          <p>
            <i className="bi bi-check2-circle text-primary"></i>{" "}
            {filteredEvents.length} Events in total
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
            <th>Paid</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event, index) => (
            <tr key={index}>
              <td>{event.eventName}</td>
              <td>{event.attendees || 0}</td>
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
              <td>{event.isPaid ? "Paid" : "Free"}</td>
              <td>
                <ActionButtons
                  event={event}
                  onEdit={() => {
                    setEditingEvent(event);
                    setShowModal(true);
                  }}
                  events={events}
                  setEvents={setEvents}
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
