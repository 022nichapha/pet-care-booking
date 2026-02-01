import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';

// Utility function to save token to localStorage
const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Utility function to get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Utility function to remove token from localStorage
const removeToken = () => {
  localStorage.removeItem('token');
};

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            
            // Save the token to localStorage
            saveToken(response.data.token);
            
            alert('สมัครสมาชิกสำเร็จ!');
            navigate('/');
        } catch (err) {
            console.error('Registration error:', err);
            alert(err.response?.data?.message || 'การสมัครล้มเหลว');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-0 bg-gradient-to-br from-blue-50 to-yellow-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 text-center text-white rounded-t-3xl">
            <div className="text-5xl mb-4">🐾</div>
            <h2 className="text-3xl font-bold mb-2">สร้างบัญชีใหม่</h2>
            <p className="text-yellow-100">เริ่มต้นการดูแลสัตว์เลี้ยงของคุณวันนี้</p>
          </div>
          <div className="bg-white p-8 rounded-b-3xl">
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อผู้ใช้</label>
                <input 
                  type="text" 
                  placeholder="กรอกชื่อผู้ใช้" 
                  className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition"
                  onChange={e => setFormData({...formData, username: e.target.value})} 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                <input 
                  type="email" 
                  placeholder="กรอกอีเมลของคุณ" 
                  className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition"
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">รหัสผ่าน</label>
                <input 
                  type="password" 
                  placeholder="กรอกรหัสผ่าน" 
                  className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition"
                  onChange={e => setFormData({...formData, password: e.target.value})} 
                  required 
                />
              </div>
              <Button variant="gradient" className="w-full py-4 text-lg font-bold">สมัครสมาชิก</Button>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">มีบัญชีอยู่แล้ว? <a href="/login" className="text-blue-600 font-medium hover:underline">เข้าสู่ระบบ</a></p>
              </div>
            </form>
          </div>
        </div>
    );
};
export default Register;