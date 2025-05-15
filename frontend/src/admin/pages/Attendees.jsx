import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import GreetingCard from "../components/GreetingCard";
import Footer from "../components/Footer";
import axiosInstance from "../../axiosConfig";

const Attendees = () => {
  const [attendees, setAttendees] = useState([]);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axiosInstance.get("/api/event-registration");
        setAttendees(response.data);
      } catch (error) {
        console.error("Error fetching attendees:", error);
      }
    };

    fetchAttendees();
  }, []);

  const handleView = (attendee) => {
    setSelectedAttendee(attendee);
    setShowModal(true);
  };

  const filteredAttendees = attendees.filter((attendee) =>
    attendee.eventId?.eventName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4 bg-light" style={{ minHeight: "100vh" }}>
          <GreetingCard
            title="Attendee List"
            subtitle="We are on a mission to help developers like you to build beautiful projects for FREE."
          />

          {/* ✅ Compact search bar aligned to the left */}
          <div className="d-flex justify-content-start mb-3" style={{ maxWidth: "300px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Filter by Events name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white rounded p-4 shadow-sm">
            <h5>Attendees List</h5>

            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Event Name</th>
                  <th>Registration Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendees.map((attendee, index) => (
                  <tr key={index}>
                    <td>{attendee.firstName} {attendee.lastName}</td>
                    <td>{attendee.email}</td>
                    <td>{attendee.eventId?.eventName || "Unknown Event"}</td>
                    <td>{new Date(attendee.registeredAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-1"
                        onClick={() => handleView(attendee)}
                      >
                        <i className="bi bi-eye"></i> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredAttendees.length === 0 && (
              <p className="text-muted text-center mt-4">
                No attendees match this event name.
              </p>
            )}
          </div>
        </div>
        <Footer />
      </div>

      {/* ✅ Attendee Detail Modal */}
      {showModal && selectedAttendee && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content bg-white rounded p-4 shadow"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <h5 className="mb-3">Attendee Details</h5>
            <p><strong>Name:</strong> {selectedAttendee.firstName} {selectedAttendee.lastName}</p>
            <p><strong>Email:</strong> {selectedAttendee.email}</p>
            <p><strong>Phone:</strong> {selectedAttendee.phone || "-"}</p>
            <p><strong>Number of Tickets:</strong> {selectedAttendee.numberOfTickets}</p>
            <p><strong>Event Name:</strong> {selectedAttendee.eventId?.eventName || "Unknown"}</p>
            <p><strong>Registration Date:</strong> {new Date(selectedAttendee.registeredAt).toLocaleString()}</p>

            <div className="text-end mt-3">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendees;
