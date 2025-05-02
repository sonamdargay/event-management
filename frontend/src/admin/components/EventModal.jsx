import { useState, useEffect } from "react";

const EventModal = ({ show, onClose, onSubmit, eventData }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [image, setImage] = useState(null);

  // Populate form when editing
  useEffect(() => {
    if (eventData) {
      setName(eventData.name || "");
      setDescription(eventData.description || "");
      setFromDate(eventData.from || "");
      setToDate(eventData.to || "");
      setImage(null); // Don’t auto-load image
    } else {
      // Reset fields for new event
      setName("");
      setDescription("");
      setFromDate("");
      setToDate("");
      setImage(null);
    }
  }, [eventData]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      from: fromDate,
      to: toDate,
      image,
    });
    onClose();
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {eventData ? "Update Event" : "Create New Event"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description of Event</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="From Date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="To Date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Featured Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {eventData ? "Update Event" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
