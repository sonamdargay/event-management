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
    // Fetch events data from API
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/api/events");
        console.log(response.data);
        setEvents(response.data); // Update state with fetched events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    
    fetchEvents();
  }, []);
  
  // Filter only published events
  const publishedEvents = events.filter(event => event.eventStatus === "Published");
  
  // Create array of event cards to display
  const displayEvents = [];
  
  // Add published events first
  for (let i = 0; i < Math.min(publishedEvents.length, 6); i++) {
    displayEvents.push({
      type: 'real',
      event: publishedEvents[i]
    });
  }
  
  // Fill remaining slots with placeholder cards
  for (let i = displayEvents.length; i < 6; i++) {
    displayEvents.push({
      type: 'placeholder',
      imageIndex: i
    });
  }

  // Handle View Details button click
  const handleViewDetails = (event) => {
    navigate(`/event/${event._id}`, { state: { event } });
  };

  return (
    <>
    <Topbar />
    
    <div className="min-h-screen px-6 py-8 bg-white">
      <h2 className="mb-6 text-3xl font-bold text-center">Upcoming Events</h2>
      {/* Add consistent card sizes with custom styles */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayEvents.map((item, index) => {
          if (item.type === 'real') {
            // Real event card with data from database
            const event = item.event;
            // Format date display
            const fromDate = new Date(event.fromDate);
            const toDate = new Date(event.toDate);
            const dateDisplay = fromDate.toISOString().split('T')[0] === toDate.toISOString().split('T')[0]
              ? fromDate.toISOString().split('T')[0].replace(/-/g, '-')
              : `${fromDate.toISOString().split('T')[0].replace(/-/g, '-')} - ${toDate.toISOString().split('T')[0].replace(/-/g, '-')}`;
            
            return (
              <div key={event._id} className="overflow-hidden bg-gray-100 rounded-lg event-card">
                <img
                  src={eventImages[index % eventImages.length]}
                  alt={event.eventName}
                  className="object-cover w-full h-40" 
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{event.eventName}</h3> 
                  <p className="mt-1 text-sm text-gray-600"> 
                    <strong>Date:</strong> {dateDisplay}
                  </p>
                  <p className="mt-1 text-sm text-gray-600"> 
                    <strong>Location:</strong> {event.location}
                  </p>
                  {event.description && (
                    <p className="mt-2 text-sm text-gray-700 line-clamp-2">{event.description}</p> 
                  )}
                  <button
                    onClick={() => handleViewDetails(event)}
                    className="px-3 py-1 mt-3 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300" 
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          } else {
            // Placeholder event card
            return (
              <div key={`placeholder-${index}`} className="overflow-hidden bg-gray-100 rounded-lg event-card">
                <div className="relative">
                  <img
                    src={eventImages[item.imageIndex % eventImages.length]}
                    alt="Coming soon"
                    className="object-cover w-full h-40"
                  />
                  {/* Overlay with "Coming Soon" text */}
                  <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50">
                    <span className="text-lg font-bold">Coming Soon</span> 
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">More events coming soon</h3> 
                  <p className="mt-2 text-sm text-gray-700 italic">
                    Stay tuned for upcoming events and activities.
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>

    {/* Add custom styles */}
    <style jsx>{`
      .event-card {
        height: 300px; /* Fixed height for all cards */
        display: flex;
        flex-direction: column;
      }
      
      .event-card > div {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }
      
      .event-card p.line-clamp-2 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    `}</style>
    </>
  );
}