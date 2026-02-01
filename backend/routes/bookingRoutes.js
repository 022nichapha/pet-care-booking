// ✅ สิ่งที่ควรอยู่ใน routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authenticateToken = require('../middleware/auth'); // Assuming you have auth middleware

// เชื่อมโยง URL เข้ากับ Function จาก Controller
router.post('/', authenticateToken, bookingController.createBooking); // Create new booking
router.get('/', authenticateToken, bookingController.getAllBookings); // Get all bookings for logged-in user
router.get('/:id', authenticateToken, bookingController.getBookingById); // Get specific booking
router.put('/:id', authenticateToken, bookingController.updateBooking); // Update booking
router.delete('/:id', authenticateToken, bookingController.deleteBooking); // Delete booking
router.put('/:id/status', authenticateToken, bookingController.updateBookingStatus); // Update booking status

// Public route for getting bookings by customer name (for history)
router.get('/customer/:customerName', bookingController.getBookingsByCustomerName);

module.exports = router;