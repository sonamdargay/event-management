// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";

// Fixed image collection
const eventImages = [
  "/images/img-1.jpg",
  "/images/img-2.jpg",
  "/images/img-3.jpg",
  "/images/img-4.jpeg",
  "/images/img-5.jpg",
  "/images/img-6.webp",
];

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
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

  // Filter published events
  const publishedEvents = events.filter(
    (event) => event.eventStatus === "Published"
  );

  // Create array of event cards to display
  const displayEvents = [];

  // Add published events
  for (let i = 0; i < Math.min(publishedEvents.length, 6); i++) {
    displayEvents.push({
      type: "real",
      event: publishedEvents[i],
    });
  }

  // Add placeholder event cards
  for (let i = displayEvents.length; i < 6; i++) {
    displayEvents.push({
      type: "placeholder",
      imageIndex: i,
    });
  }

  return (
    <div className="page-container">
      {/* HEADER */}
      <header className="page-header">
        <div className="header-inner">
          <h1>Event Management</h1>
          <div className="search-container">
            {/* menu icon */}
            <svg
              className="menu-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <input type="text" placeholder="Search Events ..." />
            {/* search icon */}
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M5.5 11a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0z"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h2>
          Event
          <br />
          Management
        </h2>
        <p>Organize and manage your events with ease</p>

        {/* ← Replace plain button with a Link */}
        <Link to="/login1">
          <button className="hero-button">Get Started</button>
        </Link>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="upcoming">
        <h3>
          <b>Upcoming Events</b>
        </h3>

        {/* Event cards */}
        <div className="events-grid">
          {displayEvents.map((item, index) => {
            if (item.type === "real") {
              // Real event with data from database
              const event = item.event;
              // Format dates
              const fromDate = new Date(event.fromDate).toLocaleDateString();
              const toDate = new Date(event.toDate).toLocaleDateString();
              const dateDisplay =
                fromDate === toDate ? fromDate : `${fromDate} - ${toDate}`;

              return (
                <div key={event._id} className="event-card">
                  <div className="event-image">
                    <img
                      src={eventImages[index % eventImages.length]}
                      alt={event.eventName}
                    />
                  </div>
                  <div className="event-info">
                    <h4>{event.eventName}</h4>
                    <p className="date-info">
                      <strong>Date:</strong> {dateDisplay}
                    </p>
                    <p className="location-info">
                      <strong>Location:</strong> {event.location}
                    </p>
                    {event.description && (
                      <p className="description">{event.description}</p>
                    )}
                  </div>
                </div>
              );
            } else {
              // Placeholder event card
              return (
                <div
                  key={`placeholder-${index}`}
                  className="event-card placeholder-card"
                >
                  <div className="event-image">
                    <img src={eventImages[item.imageIndex]} alt="Coming soon" />
                  </div>
                  <div className="event-info">
                    <h4>More events coming soon</h4>
                    <p className="description">
                      Stay tuned for upcoming events and activities.
                    </p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </section>
    </div>
  );
}
