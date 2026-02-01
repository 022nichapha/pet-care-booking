const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js'); // ตรวจสอบว่ามีไฟล์นี้จริง
const jwt = require('jsonwebtoken');

dotenv.config();

// --- เพิ่มบรรทัดนี้เพื่อเชื่อมต่อ MongoDB ---
connectDB(); 

const app = express();

app.use(cors()); 
app.use(express.json());

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-default', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.userId = user.userId;
    next();
  });
};

// Auth Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Business Logic Routes
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));