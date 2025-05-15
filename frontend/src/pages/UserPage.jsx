// src/pages/UserPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../admin/components/Topbar";
import axiosInstance from "../axiosConfig";

// Fixed collection of images for events
const eventImages = [
  "/images/img-1.jpg",
  "/images/img-2.jpg",
  "/images/img-3.jpg",
  "/images/img-4.jpeg",
  "/images/img-5.jpg",
  "/images/img-6.webp"
];

export default function UserPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const publishedEvents = events.filter(e => e.eventStatus === "Published");

  const displayEvents = [
    ...publishedEvents.slice(0, 6).map(e => ({ type: "real", event: e })),
    ...Array.from({ length: 6 - Math.min(publishedEvents.length, 6) }, (_, i) => ({
      type: "placeholder",
      imageIndex: publishedEvents.length + i
    }))
  ];

  const handleViewDetails = (event) => {
    navigate(`/event/${event._id}`, { state: { event } });
  };

  return (
    <>
      <Topbar />

      <div className="min-h-screen px-6 py-8 bg-white">
        <h2 className="mb-6 text-3xl font-bold text-center">Upcoming Events</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayEvents.map((item, idx) => {
            if (item.type === "real") {
              const { event } = item;
              const from = new Date(event.fromDate).toISOString().slice(0, 10);
              const to = new Date(event.toDate).toISOString().slice(0, 10);
              const dateDisplay = from === to ? from : `${from} - ${to}`;

              return (
                <div
                  key={event._id}
                  className="bg-gray-100 rounded-lg shadow overflow-hidden flex flex-col"
                >
                  <img
                    src={eventImages[idx % eventImages.length]}
                    alt={event.eventName}
                    className="object-cover w-full h-40"
                  />

                  <div className="p-4 flex-1 flex flex-col">
                    <div className="p-4 flex-1 flex flex-row justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{event.eventName}</h3>
                        <p className="mt-1 text-sm text-gray-600">
                          <strong>Date:</strong> {dateDisplay}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          <strong>Location:</strong> {event.location}
                        </p>
                      </div>

                      <div className="flex flex-col justify-end ml-4">
                        <button
                          onClick={() => handleViewDetails(event)}
                          className="px-5 py-2 text-base font-semibold bg-gray-200 rounded hover:bg-gray-300 self-end"
                        >
                          View Details
                        </button>
                      </div>
                    </div>

                    {event.description && (
                      <p className="px-4 pb-4 text-sm text-gray-700 line-clamp-2">
                        {event.description}
                      </p>
                    )}

                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={`ph-${idx}`}
                  className="bg-gray-100 rounded-lg shadow overflow-hidden"
                >
                  <div className="relative h-40">
                    <img
                      src={eventImages[item.imageIndex % eventImages.length]}
                      alt="Coming soon"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <span className="text-lg font-bold text-white">Coming Soon</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold">More events coming soon</h3>
                    <p className="mt-2 text-sm italic text-gray-600">
                      Stay tuned for upcoming events and activities.
                    </p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
