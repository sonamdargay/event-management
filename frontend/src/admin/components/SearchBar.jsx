const SearchBar = () => (
  <div className="d-flex justify-content-between align-items-center mb-3">
    <input
      type="text"
      placeholder="Filter by Events name..."
      className="form-control w-50"
    />
    <button className="btn btn-secondary">Add New</button>
  </div>
);

export default SearchBar;
