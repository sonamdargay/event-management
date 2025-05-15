const express = require('express');
const router = express.Router();
const EventRegistration = require('../models/EventRegistration');

// POST /api/event-registration
// Register for an event
router.post('/', async (req, res) => {
  console.log("Received registration payload:", req.body); // <-- ADD THIS

  try {
    const { eventId, firstName, lastName, phone, email, numberOfTickets } = req.body;

    const registration = new EventRegistration({
      eventId,
      firstName,
      lastName,
      phone,
      email,
      numberOfTickets,
    });

    await registration.save();
    console.log("Registration saved:", registration); // <-- ADD THIS
    res.status(201).json({ message: 'Registration successful', registration });
  } catch (error) {
    console.error('Error in event registration:', error);
    res.status(500).json({ message: 'Failed to register for event', error });
  }
});


// (Optional) GET /api/event-registration
// Get all registrations (for admin or dashboard view)
router.get('/', async (req, res) => {
  try {
    const registrations = await EventRegistration.find().populate('eventId');
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ message: 'Failed to get registrations', error });
  }
});

module.exports = router;
