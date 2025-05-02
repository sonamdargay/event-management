const FilterBar = () => (
  <div
    className="bg-white rounded p-3 mb-3 d-flex justify-content-between align-items-center shadow-sm"
    style={{ borderRadius: "10px" }}
  >
    <div className="input-group w-50">
      <span className="input-group-text bg-white border-0">
        <i className="bi bi-funnel"></i>
      </span>
      <input
        type="text"
        placeholder="Filter by Events name..."
        className="form-control border-0"
      />
    </div>
    <div>
      <button className="btn btn-light rounded-pill me-2">
        Sort By <i className="bi bi-caret-down-fill ms-1"></i>
      </button>
      <button className="btn btn-light rounded-pill me-2">
        Group By : Status <i className="bi bi-caret-down-fill ms-1"></i>
      </button>
      <button className="btn btn-light rounded-pill">
        <i className="bi bi-send me-1"></i> Share
      </button>
    </div>
  </div>
);

export default FilterBar;
