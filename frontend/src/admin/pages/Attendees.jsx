import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import GreetingCard from "../components/GreetingCard";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";

const Attendees = () => {
  const attendeeData = [
    {
      name: "Sonam Xyx",
      email: "sonam@gmail.com",
      registrationDate: "15/06/2009 13:45:30",
      gender: "Male",
    },
    {
      name: "Sonam D",
      email: "sonam@gmail.com",
      registrationDate: "15/06/2009 13:45:30",
      gender: "Male",
    },
    {
      name: "Prasant Rizal",
      email: "Prashant@gmail.com",
      registrationDate: "15/06/2009 13:45:30",
      gender: "Female",
    },
    {
      name: "Clare Xyx",
      email: "claire@gmail.com",
      registrationDate: "15/06/2009 13:45:30",
      gender: "Female",
    },
    {
      name: "Motnish Abc",
      email: "mothis@gmail.com",
      registrationDate: "15/06/2009 13:45:30",
      gender: "Female",
    },
  ];

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4 bg-light" style={{ minHeight: "100vh" }}>
          <GreetingCard
            title="Attendee List"
            subtitle="We are on a mission to help developers like you to build beautiful projects for FREE."
          />
          <FilterBar />

          <div className="bg-white rounded p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Summer Dev Bootcamps</h5>
              <button className="btn btn-secondary">Add New</button>
            </div>

            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Registration Date</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendeeData.map((attendee, index) => (
                  <tr key={index}>
                    <td>{attendee.name}</td>
                    <td>{attendee.email}</td>
                    <td>{attendee.registrationDate}</td>
                    <td>{attendee.gender}</td>
                    <td>
                      <button className="btn btn-primary btn-sm me-1">
                        <i className="bi bi-eye"></i> View
                      </button>
                      <button className="btn btn-outline-secondary btn-sm">
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Attendees;
