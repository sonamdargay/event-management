import { useState } from "react";
import ActionButtons from "./ActionButtons";
import EventModal from "./EventModal";

const sampleEvents = [
  {
    name: "Hello Events",
    attendees: ["SP", "PP", "MM"],
    from: "15/06/2009 13:45:30",
    to: "15/06/2009 13:45:30",
    status: "Published",
  },
  {
    name: "Students Meet",
    attendees: ["SP", "PP"],
    from: "15/06/2009 13:45:30",
    to: "15/06/2009 13:45:30",
    status: "Published",
  },
  {
    name: "Summer Camp",
    attendees: ["SP", "PP", "MM"],
    from: "15/06/2009 13:45:30",
    to: "15/06/2009 13:45:30",
    status: "Draft",
  },
];

const EventTable = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddNew = () => {
    setShowModal(true);
  };

  const handleModalSubmit = (newEventData) => {
    console.log("Submitted event:", newEventData);
    // Here you can update the sampleEvents list (if you manage it in a parent component)
  };
  return (
    <div className="bg-white rounded p-3 shadow-sm">
      <div className="row">
        <div className="col-md-8">
          <h5>Your Events</h5>
          <p>
            <i className="bi bi-check2-circle text-primary"></i> 15 New Acquired
            this month
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
      <table className="table table-hover align-middle">
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
          {sampleEvents.map((event, index) => (
            <tr key={index}>
              <td>{event.name}</td>
              <td>
                {event.attendees.map((a, idx) => (
                  <span key={idx} className="border rounded-circle px-2 me-1">
                    {a}
                  </span>
                ))}
              </td>
              <td>{event.from}</td>
              <td>{event.to}</td>
              <td>{event.status}</td>
              <td>
                <ActionButtons />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EventModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default EventTable;
