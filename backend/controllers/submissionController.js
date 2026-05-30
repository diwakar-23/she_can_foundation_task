const Submission = require('../models/Submission');

// @desc    Submit contact form
// @route   POST /api/submissions
// @access  Public
const createSubmission = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Server-side validation check
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const newSubmission = await Submission.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: 'Form Submitted Successfully',
      data: newSubmission
    });
  } catch (error) {
    // Catching duplicate key error for unique email constraint
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'This email has already been submitted.' });
    }
    res.status(500).json({ success: false, message: 'Server Error. Please try again later.' });
  }
};

// @desc    Get all submissions (for Admin Panel)
// @route   GET /api/submissions
// @access  Private (Will add auth middleware next)
const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 }); // Latest first
    res.status(200).json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error. Could not fetch data.' });
  }
};

module.exports = {
  createSubmission,
  getSubmissions
};


const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 1. Aapka purana createSubmission function yahan hoga...
// 2. Aapka purana getSubmissions function yahan hoga...

// 3. AB YAHAN YE NAVA LOGIN FUNCTION PASTE KARIYE:
const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const configUsername = process.env.ADMIN_USERNAME;
    const configPasswordHash = process.env.ADMIN_PASSWORD_HASH; 

    if (!configUsername || !configPasswordHash) {
      return res.status(500).json({ success: false, message: 'Server configuration error.' });
    }

    if (username !== configUsername) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, configPasswordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { username: configUsername, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ success: true, message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Sabse neeche export me adminLogin ko add karna mat bhulna:
module.exports = {
  createSubmission,
  getSubmissions,
  adminLogin // <-- Ye zaroor likhein
};