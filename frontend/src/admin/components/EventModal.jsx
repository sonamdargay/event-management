import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../axiosConfig";
import { eventBus } from "./EventBus";

const EventModal = ({
  show,
  onClose,
  events,
  setEvents,
  editingEvent,
  setEditingEvent,
}) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    fromDate: "",
    toDate: "",
    location: "",
    eventStatus: "Draft", // 👈 Default status
    featuredImage: null,
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        eventName: editingEvent.eventName || "",
        description: editingEvent.description || "",
        fromDate: editingEvent.fromDate
          ? editingEvent.fromDate.substring(0, 10)
          : "",
        toDate: editingEvent.toDate ? editingEvent.toDate.substring(0, 10) : "",
        location: editingEvent.location || "",
        eventStatus: editingEvent.eventStatus || "Draft", // 👈 Pre-fill status
        featuredImage: null,
      });
    } else {
      setFormData({
        eventName: "",
        description: "",
        fromDate: "",
        toDate: "",
        location: "",
        eventStatus: "Draft",
        featuredImage: null,
      });
    }
  }, [editingEvent]);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Authorization header:", `Bearer ${user?.token}`);

    const data = new FormData();
    data.append("eventName", formData.eventName);
    data.append("description", formData.description);
    data.append("fromDate", formData.fromDate);
    data.append("toDate", formData.toDate);
    data.append("location", formData.location);
    data.append("eventStatus", formData.eventStatus); // 👈 Include event status
    if (formData.featuredImage) {
      data.append("featuredImage", formData.featuredImage);
    }

    try {
      let response;
      if (editingEvent) {
        response = await axiosInstance.put(
          `/api/events/${editingEvent._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setEvents(
          events.map((event) =>
            event._id === response.data._id ? response.data : event
          )
        );
      } else {
        response = await axiosInstance.post("/api/events", data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setEvents([...events, response.data]);
        console.log("New event added:", response.data);
      }
      // console.log(" emmission of broadcast during submit")
      // eventBus.emit('broadcastEmitted', " Event has just been updated. Check now")
      setEditingEvent(null);
      onClose();
    } catch (error) {
      alert("Failed to save event.");
      console.error(error);
    }
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
              {editingEvent ? "Update Event" : "Create New Event"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.eventName}
                  onChange={(e) =>
                    setFormData({ ...formData, eventName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3 d-flex gap-2">
                <div className="flex-fill">
                  <label className="form-label">From Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.fromDate}
                    onChange={(e) =>
                      setFormData({ ...formData, fromDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex-fill">
                  <label className="form-label">To Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.toDate}
                    onChange={(e) =>
                      setFormData({ ...formData, toDate: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={formData.eventStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, eventStatus: e.target.value })
                  }
                  required
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Featured Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featuredImage: e.target.files[0],
                    })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  onClose();
                  setEditingEvent(null);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingEvent ? "Update Event" : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
