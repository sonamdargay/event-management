const Topbar = ({ onToggleSidebar }) => (
  <div className="topbar d-flex justify-content-between align-items-center p-3 bg-white border-bottom">
    <div className="d-flex align-items-center">
      <button
        onClick={onToggleSidebar}
        className="btn btn-primary rounded-circle me-3"
        style={{ width: "40px", height: "40px" }}
      >
        <i className="bi bi-arrow-left text-white"></i>
      </button>

      <div className="input-group" style={{ width: "250px" }}>
        <span className="input-group-text bg-white border-end-0">
          <i className="bi bi-search text-muted"></i>
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search..."
        />
      </div>
    </div>

    <div className="d-flex align-items-center">
      <i className="bi bi-person-circle fs-3"></i>
      <span className="ms-2">
        Sonam Dargay
        <br />
        <small>Events Manager</small>
      </span>
    </div>
  </div>
);

export default Topbar;
