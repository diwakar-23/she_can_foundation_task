const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const submissionRoutes = require('./routes/submissionRoutes');

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' })); // Allow React app port
app.use(express.json()); // Parses incoming JSON payloads

// Routes Link
app.use('/api', submissionRoutes);

// MongoDB Connection & Server Start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully ✅');
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
  })
  .catch((err) => {
    console.error('Database Connection Failed ❌', err.message);
  });
  