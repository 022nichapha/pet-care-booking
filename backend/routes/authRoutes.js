const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. สมัครสมาชิก (POST /api/auth/register)
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ตรวจสอบว่าผู้ใช้ยังไม่มีอยู่แล้ว
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'ชื่อผู้ใช้หรืออีเมลมีผู้ใช้งานแล้ว' 
      });
    }

    // เข้ารหัสรหัสผ่าน
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // สร้างผู้ใช้ใหม่
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ 
      message: 'สมัครสมาชิกสำเร็จ',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'ไม่สามารถสมัครสมาชิกได้', 
      error: err.message 
    });
  }
};

// 2. เข้าสู่ระบบ (POST /api/auth/login)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ตรวจสอบว่ามีผู้ใช้ในระบบหรือไม่
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' 
      });
    }

    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' 
      });
    }

    // สร้าง JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key-default',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'เข้าสู่ระบบสำเร็จ',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'ไม่สามารถเข้าสู่ระบบได้', 
      error: err.message 
    });
  }
};

// 3. ดึงข้อมูลผู้ใช้ (GET /api/auth/me)
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ 
      message: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้', 
      error: err.message 
    });
  }
};