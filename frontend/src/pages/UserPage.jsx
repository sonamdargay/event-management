// src/pages/UserPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../admin/components/Topbar";

const events = [
  {
    id: 1,
    image: "/images/img-1.jpg",
    title: "Music Marathon",
    date: "3rd June",
    location: "Brisbane",
    description: "A thrilling city marathon featuring live bands across the route."
  },
  {
    id: 2,
    image: "/images/img-2.jpg",
    title: "Food Festival",
    date: "15th August",
    location: "Perth",
    description: "Savor global cuisines and local delights."
  },
  {
    id: 3,
    image: "/images/img-3.jpg",
    title: "Music Show",
    date: "20th December",
    location: "Sydney",
    description: "Live concert with famous artists and DJs."
  },
  {
    id: 4,
    image: "/images/img-4.jpeg",
    title: "Tech Innovation Expo",
    date: "2nd October",
    location: "Melbourne",
    description: "Cutting-edge technologies and innovations across industries."
  },
  {
    id: 5,
    image: "/images/img-5.jpg",
    title: "Business Conference",
    date: "10th May",
    location: "Sydney",
    description: "Engage with leaders and professionals in a formal setting."
  },
  {
    id: 6,
    image: "/images/img-6.webp",
    title: "Cultural Night Show",
    date: "16th November",
    location: "Brisbane",
    description: "Celebrate diversity with music, dance, and art."
  }
];

export default function UserPage() {
  const navigate = useNavigate();

 


  const handleViewDetails = (event) => {
    navigate(`/event/${event.id}`, { state: { event } }); // <-- functionality from new code
  };

  return (
    // render a topbar for users to logout
    <>
    <Topbar />
    
    <div className="min-h-screen px-6 py-8 bg-white">
      <h2 className="mb-6 text-3xl font-bold text-center">Upcoming Events</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="overflow-hidden bg-gray-100 rounded-lg">
            <img
              src={event.image}
              alt={event.title}
              className="object-cover w-full h-48"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="mt-1 text-gray-600">
                {event.date}, {event.location}
              </p>
              <button
                onClick={() => handleViewDetails(event)}
                className="px-4 py-2 mt-4 font-bold bg-gray-200 rounded hover:bg-gray-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
