// ✅ สิ่งที่ควรอยู่ใน controllers/bookingController.js
const Booking = require('../models/Booking');
const Service = require('../models/Service');

// สร้างการจองใหม่
exports.createBooking = async (req, res) => {
  try {
    const { serviceId, customerName, phoneNumber, appointmentDate } = req.body;
    
    // ตรวจสอบว่าบริการมีอยู่จริง
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'ไม่พบบริการที่ระบุ' });
    }
    
    const newBooking = new Booking({
      serviceId,
      customerId: req.userId, // เชื่อมโยงกับผู้ใช้ที่ล็อกอิน
      customerName,
      phoneNumber,
      appointmentDate,
      status: 'pending' // สถานะเริ่มต้น
    });
    
    const savedBooking = await newBooking.save();
    
    // Populate ข้อมูลบริการเพื่อส่งกลับไป
    const populatedBooking = await Booking.findById(savedBooking._id)
      .populate('serviceId');
    
    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'ไม่สามารถสร้างการจองได้', error: error.message });
  }
};

// ดึงการจองทั้งหมดของผู้ใช้ที่ล็อกอิน
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.userId })
      .populate('serviceId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลการจองได้', error: error.message });
  }
};

// ดึงข้อมูลการจองตาม ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('serviceId');
    
    if (!booking) {
      return res.status(404).json({ message: 'ไม่พบการจอง' });
    }
    
    // ตรวจสอบว่าเป็นการจองของผู้ใช้นี้หรือไม่
    if (booking.customerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'ไม่มีสิทธิ์เข้าถึงการจองนี้' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลการจองได้', error: error.message });
  }
};

// ปรับปรุงข้อมูลการจอง
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'ไม่พบการจอง' });
    }
    
    // ตรวจสอบว่าเป็นการจองของผู้ใช้นี้หรือไม่
    if (booking.customerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'ไม่มีสิทธิ์แก้ไขการจองนี้' });
    }
    
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('serviceId');
    
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'ไม่สามารถปรับปรุงการจองได้', error: error.message });
  }
};

// ลบการจอง
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'ไม่พบการจอง' });
    }
    
    // ตรวจสอบว่าเป็นการจองของผู้ใช้นี้หรือไม่
    if (booking.customerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'ไม่มีสิทธิ์ลบการจองนี้' });
    }
    
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'ลบการจองเรียบร้อยแล้ว' });
  } catch (error) {
    res.status(500).json({ message: 'ไม่สามารถลบการจองได้', error: error.message });
  }
};

// อัปเดตสถานะการจอง
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedBooking = await Booking.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    ).populate('serviceId');
    
    if (!updatedBooking) {
      return res.status(404).json({ message: 'ไม่พบการจอง' });
    }
    
    res.status(200).json({ message: 'สำเร็จ', updatedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

// ดึงการจองตามชื่อลูกค้า (สำหรับหน้า history)
exports.getBookingsByCustomerName = async (req, res) => {
  try {
    const { customerName } = req.params;
    const bookings = await Booking.find({ customerName })
      .populate('serviceId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลการจองได้', error: error.message });
  }
};