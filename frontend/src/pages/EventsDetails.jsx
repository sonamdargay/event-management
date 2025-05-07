// src/pages/EventDetails.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const EventDetails = () => {
  const { state } = useLocation();
  const event = state?.event;

  if (!event) return <p className="text-center mt-10 text-red-500">Event not found.</p>;

  return (
    <div className="min-h-screen bg-white">
      {/* Image centered with 2-column white space on both sides */}
      <div className="grid grid-cols-12 pt-6">
        <div className="col-span-8 col-start-3">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Centered form and event details */}
      <div className="flex justify-center items-start pt-16 pb-10 px-4">
        <div className="max-w-xl w-full">
          <h2 className="text-2xl font-bold mb-1">{event.title} 2025!!</h2>
          <p className="text-gray-600 mb-2">{event.date}, {event.location}</p>
          <p className="text-gray-700 mb-6">{event.description}</p>

          <h3 className="text-xl font-semibold mb-4">Register for the Event</h3>
          <form className="grid gap-4">
            <div>
              <label className="block mb-1">First Name</label>
              <input type="text" required className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input type="text" required className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block mb-1">Phone</label>
              <input type="tel" required className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input type="email" required className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block mb-1">Number of Tickets</label>
              <input
                type="number"
                min="0"
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
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
