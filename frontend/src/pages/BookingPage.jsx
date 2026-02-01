import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../components/Booking/BookingForm';

// Utility function to get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

const BookingPage = () => {
  const { state: service } = useLocation(); // รับข้อมูลบริการที่เลือกมาจากหน้า Home
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    customerName: '', 
    phoneNumber: '', 
    appointmentDate: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ส่งข้อมูลการจองพร้อม serviceId (Relationship)
      await axios.post('http://localhost:5000/api/bookings', {
        ...formData,
        serviceId: service._id // อ้างอิง ID ของบริการ
      });
      alert('จองบริการสำเร็จ!');
      navigate('/history');
    } catch (err) {
      console.error('Booking error:', err);
      if (err.response?.status === 401) {
        alert('กรุณาเข้าสู่ระบบก่อนทำการจอง');
        navigate('/login');
      } else {
        alert('เกิดข้อผิดพลาด: ' + err.response?.data?.message);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-16 px-4">
      <div className="bg-gradient-to-br from-blue-50 to-yellow-50 p-1 rounded-3xl shadow-2xl">
        <div className="bg-white rounded-3xl p-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-100 to-yellow-100 p-6 rounded-full mb-6">
              <div className="text-6xl bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">🐾</div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-3">ยืนยันการจอง</h2>
            <p className="text-gray-600 text-lg">บริการ: <span className="font-semibold text-blue-600">{service?.name}</span></p>
            <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-400 to-yellow-400 mx-auto rounded-full"></div>
          </div>
          <BookingForm 
            serviceName={service?.name} 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handleSubmit} 
          />
        </div>
      </div>
    </div>
  );
};
export default BookingPage;