// src/pages/UserPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const events = [
  {
    id: 1,
    image: "/images/img-1.jpg",
    title: "Music Marathon",
    date: "3rd June",
    location: "Brisbane",
  },
  {
    id: 2,
    image: "/images/img-2.jpg",
    title: "Food Festival",
    date: "15th August",
    location: "Perth",
  },
  {
    id: 3,
    image: "/images/img-3.jpg",
    title: "Music Show",
    date: "20th December",
    location: "Sydney",
  },
  {
    id: 4,
    image: "/images/img-4.jpeg",
    title: "Tech Innovation Expo",
    date: "2nd October",
    location: "Melbourne",
  },
  {
    id: 5,
    image: "/images/img-5.jpg",
    title: "Business Conference",
    date: "10th May",
    location: "Sydney",
  },
  {
    id: 6,
    image: "/images/img-6.webp",
    title: "Cultural Night Show",
    date: "16th November",
    location: "Brisbane",
  },
];

export default function UserPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white py-8 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-600 mt-1">
                {event.date}, {event.location}
              </p>
              <button
                onClick={() => navigate(`/events/${event.id}`)}
                className="mt-4 px-4 py-2 bg-gray-200 font-bold rounded hover:bg-gray-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
