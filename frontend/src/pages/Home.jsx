import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const BASE_URL = axiosInstance.defaults.baseURL || "http://localhost:5001";

export default function Home() {
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

  const publishedEvents = events.filter(
    (event) => event.eventStatus === "Published"
  );

  // Display up to 6 cards; if less than 6 events, fill the rest with placeholders
  const displayEvents = [];

  for (let i = 0; i < Math.min(publishedEvents.length, 6); i++) {
    displayEvents.push({
      type: "real",
      event: publishedEvents[i],
    });
  }

  for (let i = displayEvents.length; i < 6; i++) {
    displayEvents.push({ type: "placeholder" });
  }

  return (
    <div className="page-container">
      {/* HEADER */}
      <header className="page-header">
        <div className="header-inner">
          <h1>Event Management</h1>
          <div className="search-container">
            <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <input type="text" placeholder="Search Events ..." />
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M5.5 11a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0z" />
            </svg>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <h2>
          Event
          <br />
          Management
        </h2>
        <p>Organize and manage your events with ease</p>

        <Link to="/login1">
          <button className="hero-button">Get Started</button>
        </Link>
      </section>

      {/* UPCOMING EVENTS SECTION */}
      <section className="upcoming">
        <h3><b>Upcoming Events</b></h3>
        <div className="events-grid">
          {displayEvents.map((item, index) => {
            if (item.type === "real") {
              const event = item.event;
              return (
                <div key={event._id} className="event-card">
                  <div className="event-image">
                    {event.featuredImage && (
                      <img
                        src={`${BASE_URL}/uploads/${event.featuredImage}`}
                        alt={event.eventName}
                        style={{ objectFit: "cover", height: "200px", width: "100%" }}
                      />
                    )}
                  </div>
                  <div className="event-info">
                    <h4>{event.eventName}</h4>
                    <p className="location-info">
                      <strong>Location:</strong> {event.location}
                    </p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={`placeholder-${index}`} className="event-card placeholder-card">
                  <div className="event-image" style={{ height: "200px", backgroundColor: "#f1f1f1" }} />
                  <div className="event-info">
                    <h4>More events coming soon</h4>
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
