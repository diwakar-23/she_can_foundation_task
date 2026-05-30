const express = require('express');
const router = express.Router();
const { createSubmission, getSubmissions, adminLogin } = require('../controllers/submissionController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Public route for form data submission
router.post('/submissions', createSubmission);

// Public route for admin authentication
router.post('/admin/login', adminLogin);

// Protected route — only authorized admins can access data
router.get('/submissions', protectAdmin, getSubmissions); 

module.exports = router;