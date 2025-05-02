import { useState } from "react";
import EventModal from "./EventModal";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";

const ActionButtons = ({ event, eventId, onUpdate, onDelete }) => {
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleEditSubmit = (updatedEvent) => {
    onUpdate(updatedEvent);
    setShowEdit(false);
  };

  return (
    <>
      <button
        className="btn btn-primary btn-sm me-1"
        onClick={() => navigate(`/admin/events/${eventId}`)}
      >
        <i className="bi bi-eye"></i> View
      </button>
      <button
        className="btn btn-outline-secondary btn-sm me-1"
        onClick={() => setShowEdit(true)}
      >
        <i className="bi bi-pencil"></i> Edit
      </button>
      <button
        className="btn btn-dark btn-sm"
        onClick={() => setShowDelete(true)}
      >
        <i className="bi bi-trash"></i> Delete
      </button>

      {/* Edit modal */}
      <EventModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        onSubmit={handleEditSubmit}
        eventData={event}
      />

      {/* Delete modal */}
      <DeleteModal
        show={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => {
          onDelete();
          setShowDelete(false);
        }}
      />
    </>
  );
};

export default ActionButtons;
