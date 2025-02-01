const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faq');

// Get all FAQs
router.get('/', faqController.getAllFAQs);

// Get a single FAQ by ID (with optional language query parameter)
router.get('/:id', faqController.getFAQById);

// Create a new FAQ
router.post('/', faqController.createFAQ);

// Update an existing FAQ by ID
router.put('/:id', faqController.updateFAQ);

// Delete a FAQ by ID
router.delete('/:id', faqController.deleteFAQ);

module.exports = router;