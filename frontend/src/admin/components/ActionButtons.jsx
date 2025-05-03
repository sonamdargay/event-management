import { useState } from "react";
import EventModal from "./EventModal";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import { useAuth } from "../../context/AuthContext";

const ActionButtons = ({ event, onEdit, events, setEvents }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/events/${event._id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      // Remove the deleted event from state
      setEvents(events.filter((e) => e._id !== event._id));
    } catch (error) {
      console.error("Failed to delete event:", error);
      alert("Failed to delete event.");
    }
  };

  return (
    <>
      <button
        className="btn btn-primary btn-sm me-1"
        onClick={() => navigate(`/admin/events/${event._id}`)}
      >
        <i className="bi bi-eye"></i> View
      </button>
      <button
        className="btn btn-outline-secondary btn-sm me-1"
        onClick={onEdit} // This is passed from EventTable
      >
        <i className="bi bi-pencil"></i> Edit
      </button>
      <button
        className="btn btn-dark btn-sm"
        onClick={() => setShowDelete(true)}
      >
        <i className="bi bi-trash"></i> Delete
      </button>

      <DeleteModal
        show={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => {
          handleDelete();
          setShowDelete(false);
        }}
      />
    </>
  );
};

export default ActionButtons;
