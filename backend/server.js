// ========================================
// She Can Foundation - Backend Server
// Express.js + MongoDB REST API
// ========================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Import Routes
const contactRoutes = require('./routes/contact.routes');
const authRoutes = require('./routes/auth.routes');
const statsRoutes = require('./routes/stats.routes');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ========================================
// Middleware
// ========================================

// CORS Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging (development)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ========================================
// API Routes
// ========================================

app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'She Can Foundation API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// ========================================
// Database Connection
// ========================================

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shecan_foundation');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Don't exit in development - continue with demo mode
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

// ========================================
// Start Server
// ========================================

const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`
    🚀 She Can Foundation API Server
    📡 Running on port ${PORT}
    🌐 Environment: ${process.env.NODE_ENV || 'development'}
    📚 API Docs: http://localhost:${PORT}/api
    `);
  });
};

startServer();

module.exports = app;
