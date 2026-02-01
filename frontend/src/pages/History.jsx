import { useState } from 'react';
import axios from 'axios';
import { HistoryCard } from '../components/common/Card';

// Utility function to get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

const History = () => {
  const [searchName, setSearchName] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Check if user is logged in
      const token = getToken();
      if (token) {
        // If user is logged in, fetch their bookings
        const res = await axios.get('http://localhost:5000/api/bookings');
        setBookings(res.data);
      } else {
        // Otherwise, search by customer name
        const res = await axios.get(`http://localhost:5000/api/bookings/customer/${searchName}`);
        setBookings(res.data);
      }
    } catch (err) {
      console.error("Fetch history failed", err);
      if (err.response?.status === 401) {
        alert('กรุณาเข้าสู่ระบบเพื่อดูประวัติการจองของคุณ');
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-yellow-50 to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-100 to-yellow-100 p-4 rounded-full mb-6">
            <div className="text-5xl bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">📜</div>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">ประวัติการจองของคุณ</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">ตรวจสอบสถานะและรายละเอียดการนัดหมายสัตว์เลี้ยงของคุณอย่างง่ายดาย</p>
        </div>

        {/* ส่วนค้นหา */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex gap-2 mb-10">
          <input 
            type="text"
            placeholder="พิมพ์ชื่อที่คุณใช้จอง..."
            className="flex-1 p-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button 
            onClick={handleSearch}
            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-500 hover:to-blue-600 transition active:scale-95"
          >
            {loading ? 'กำลังค้นหา...' : 'ค้นหา'}
          </button>
        </div>

        {/* รายการประวัติ */}
        <div className="space-y-4">
          {bookings.length > 0 ? (
            bookings.map(item => <HistoryCard key={item._id} booking={item} />)
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400">ไม่พบประวัติการจองในชื่อนี้</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;