const DeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content text-center p-4">
          <p className="text-muted">Are you sure to delete this event?</p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-danger px-4" onClick={onConfirm}>
              Delete
            </button>
            <button className="btn btn-dark px-4" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
