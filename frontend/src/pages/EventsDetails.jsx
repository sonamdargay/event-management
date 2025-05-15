import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EventsDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const event = state?.event;

  // Log for debugging
  console.log("Received event:", event);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    numberOfTickets: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event || !event._id) {
      alert("Event ID is missing.");
      return;
    }

    try {
      const registrationPayload = {
        eventId: event._id,
        ...formData,
      };

      console.log("Submitting registration:", registrationPayload);

      const response = await axios.post("http://localhost:5001/api/event-registration", registrationPayload);
      console.log("Server response:", response.data);

      setSuccess(true);
    } catch (error) {
      console.error("Error during registration:", error.response?.data || error.message);
      alert("Registration failed. Please try again.");
    }
  };

  const handleBrowseEvents = () => {
    navigate("/userPage");
  };

  // Handle missing event data
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500 text-lg font-semibold">Event not found or missing data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Centered image with 2-column white space */}
      <div className="grid grid-cols-12 pt-6">
        <div className="col-span-8 col-start-3">
          <img
            src={`http://localhost:5001/uploads/${event.featuredImage}`}
            alt={event.eventName}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Event details and registration form or success message */}
      <div className="flex justify-center items-start pt-16 pb-10 px-4">
        <div className="max-w-xl w-full">
          <h2 className="text-2xl font-bold mb-1">{event.eventName} 2025!!</h2>
          <p className="text-gray-600 mb-2">
            {new Date(event.fromDate).toLocaleDateString()} - {event.location}
          </p>
          <p className="text-gray-700 mb-6">{event.description}</p>

          {success ? (
            <div className="bg-green-100 p-6 rounded shadow text-center">
              <h3 className="text-2xl font-bold text-green-700 mb-4">🎉 Registration Successful!</h3>
              <p className="mb-6">Thank you for registering for <strong>{event.eventName}</strong>.</p>
              <button
                onClick={handleBrowseEvents}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
              >
                Browse More Events
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-4">Register for the Event</h3>
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Number of Tickets</label>
                  <input
                    type="number"
                    name="numberOfTickets"
                    min="1"
                    value={formData.numberOfTickets}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-300 font-bold py-2 rounded hover:bg-gray-400"
                >
                  Register
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsDetails;
