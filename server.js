const express = require('express');
const mongoose = require('mongoose');
const faqRoutes = require('./routes/faq');
const path = require('path');
const { createClient } = require('redis');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Make Redis available to routes via app locals
app.locals.redisClient = redisClient;

// API Routes
app.use('/api/faqs', faqRoutes);


// Start server only if file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;