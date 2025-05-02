// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const images = [
  "/images/img-1.jpg",
  "/images/img-2.jpg",
  "/images/img-3.jpg",
  "/images/img-4.jpeg",
];

export default function Home() {
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
        <h3><b>Upcoming Events</b></h3>
        <div className="events-grid">
          {images.map((src, i) => (
            <div key={i} className="card">
              <img src={src} alt={`Event ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
