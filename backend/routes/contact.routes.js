// ========================================
// Contact Routes
// REST API for Contact Form Submissions
// ========================================

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { protect, authorize } = require('../middleware/auth');

// ========================================
// Validation Rules
// ========================================

const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .trim()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .withMessage('Please provide a valid phone number'),
  body('subject')
    .isIn([
      'General Inquiry',
      'Program Information',
      'Mentorship',
      'Partnership',
      'Support',
      'Feedback'
    ])
    .withMessage('Please select a valid subject'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// ========================================
// Routes
// ========================================

/**
 * @route   POST /api/contact
 * @desc    Submit a new contact form
 * @access  Public
 */
router.post('/', contactValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array()[0].msg
      });
    }

    // Create new contact submission
    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Form submitted successfully'
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit form. Please try again.'
    });
  }
});

/**
 * @route   GET /api/contact
 * @desc    Get all contact submissions
 * @access  Private (Admin)
 */
router.get('/', protect, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch submissions'
    });
  }
});

/**
 * @route   GET /api/contact/:id
 * @desc    Get single contact submission
 * @access  Private (Admin)
 */
router.get('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch submission'
    });
  }
});

/**
 * @route   PATCH /api/contact/:id
 * @desc    Update contact submission status
 * @access  Private (Admin)
 */
router.patch('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'Reviewed', 'Completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found'
      });
    }

    res.json({
      success: true,
      data: contact,
      message: 'Status updated successfully'
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update submission'
    });
  }
});

/**
 * @route   DELETE /api/contact/:id
 * @desc    Delete a contact submission
 * @access  Private (Admin)
 */
router.delete('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found'
      });
    }

    res.json({
      success: true,
      data: null,
      message: 'Submission deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete submission'
    });
  }
});

module.exports = router;
