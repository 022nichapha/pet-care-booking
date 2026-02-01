const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// 1. ดึงรายการบริการทั้งหมด (GET /api/services)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. เพิ่มรายการบริการใหม่ (POST /api/services)
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.name || !req.body.description || !req.body.price || !req.body.imageUrl) {
      return res.status(400).json({ message: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' });
    }
    
    const service = new Service({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl
    });
    
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. แก้ไขข้อมูลบริการ (PUT /api/services/:id)
router.put('/:id', async (req, res) => {
  try {
    // If imageUrl is provided, validate it
    if (req.body.imageUrl && !isValidUrl(req.body.imageUrl)) {
      return res.status(400).json({ message: 'URL รูปภาพไม่ถูกต้อง' });
    }
    
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Helper function to validate URL
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// 4. ลบรายการบริการ (DELETE /api/services/:id)
router.delete('/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'ลบรายการบริการเรียบร้อยแล้ว' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;