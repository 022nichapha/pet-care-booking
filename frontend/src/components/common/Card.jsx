import React from 'react';

// Utility function to optimize image URLs
const optimizeImage = (url, width = 600) => {
  if (!url) return url;
  
  // If it's an Unsplash URL, add parameters for optimization
  if (url.includes('unsplash.com')) {
    const hasParams = url.includes('?');
    const separator = hasParams ? '&' : '?';
    return `${url}${separator}w=${width}&auto=format&fit=crop&q=80`;
  }
  
  // For other URLs, just return as is
  return url;
};

// --- 1. การ์ดแสดงบริการสำหรับหน้าแรก (Home) ---
export const ServiceCard = ({ service, onBook }) => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 group">
      <div className="relative h-56 overflow-hidden">
        {/* แสดงรูปภาพจากฐานข้อมูล หรือรูปภาพสำรองหากไม่มี */}
        <img 
          src={optimizeImage(service.imageUrl || 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7')}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-400 to-blue-500 backdrop-blur-sm px-4 py-2 rounded-full text-white font-bold shadow-lg">
          ฿{service.price}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-center p-4">
            <div className="text-4xl mb-2">🐾</div>
            <p className="font-bold">คลิกเพื่อจอง</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.name}</h3>
        <p className="text-gray-600 mb-6 line-clamp-2">{service.description}</p>
        <button 
          onClick={onBook}
          className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold py-4 rounded-2xl hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-200/50 active:scale-95"
        >
          จองบริการนี้
        </button>
      </div>
    </div>
  );
};

// --- 2. การ์ดแสดงประวัติการจองสำหรับหน้าประวัติ (History) ---
export const HistoryCard = ({ booking }) => {
  // กำหนดสีตามสถานะการจอง
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-600',
    confirmed: 'bg-green-100 text-green-600',
    cancelled: 'bg-red-100 text-red-600'
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-6 shadow-lg border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="flex items-center gap-5">
        <div className="bg-gradient-to-br from-blue-100 to-yellow-100 p-4 rounded-2xl text-3xl flex items-center justify-center w-16 h-16 group-hover:scale-110 transition-transform">
          <span className="text-2xl">🐾</span>
        </div>
        <div>
          {/* ดึงชื่อบริการมาแสดงผ่าน Relationship (serviceId) */}
          <h4 className="font-bold text-gray-800 text-xl mb-1">
            {booking.serviceId?.name || 'บริการทั่วไป'}
          </h4>
          <p className="text-gray-600 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {new Date(booking.appointmentDate).toLocaleString('th-TH', { 
              dateStyle: 'medium', timeStyle: 'short' 
            })}
          </p>
        </div>
      </div>
      
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3">
        {/* แสดงข้อความสถานะภาษาไทย */}
        <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${statusColors[booking.status] || 'bg-gray-100'}`}>
          {booking.status === 'pending' ? 'รอรับบริการ' : 'สำเร็จแล้ว'}
        </span>
        <p className="font-bold text-xl text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">
          ฿{booking.serviceId?.price || '0'}
        </p>
      </div>
    </div>
  );
};