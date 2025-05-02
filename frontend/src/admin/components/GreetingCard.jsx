const GreetingCard = ({
  title = "Hello Sonam !",
  subtitle = "This is an event management system built with React and Node.js.",
}) => (
  <div
    className="position-relative rounded mb-3 text-white p-4"
    style={{
      background: "linear-gradient(45deg, #0043CE, #0f62fe)",
      borderRadius: "8px",
      minHeight: "150px",
      overflow: "hidden",
    }}
  >
    <h2 className="fw-bold display-6 mb-2">{title}</h2>
    <p className="lead mb-0">{subtitle}</p>

    <button className="btn btn-primary position-absolute top-0 end-0 m-3 rounded">
      <i className="bi bi-mic-fill me-1"></i> Announcements
    </button>

    <div
      className="position-absolute"
      style={{
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.05)",
        top: "-300px",
        right: "-300px",
      }}
    ></div>
  </div>
);

export default GreetingCard;
