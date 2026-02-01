import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from '../components/common/Card';

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

const Home = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // อย่าลืมรัน Backend ให้สำเร็จก่อนนะครับ
    axios.get('http://localhost:5000/api/services')
      .then(res => setServices(res.data))
      .catch(err => console.error("Network Error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-24 px-4 rounded-b-[4rem] shadow-2xl mb-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-5xl opacity-20 animate-bounce">🐾</div>
        <div className="absolute bottom-10 right-10 text-5xl opacity-20 animate-pulse">🐕</div>
        <div className="absolute top-1/2 left-1/4 text-4xl opacity-15 animate-bounce-slow">🐩</div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">บริการเพื่อนรักสี่ขา 🐶</h1>
          <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">อาบน้ำ ตัดขน และดูแลสัตว์เลี้ยงของคุณด้วยความรักและความใส่ใจ</p>
          
          {/* ปุ่มเลือกบริการ */}
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 max-w-sm border border-white/30 shadow-lg">
              <h2 className="text-2xl font-bold mb-5">เลือกบริการที่คุณต้องการ</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 flex items-center gap-3 shadow-lg shadow-yellow-200/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                  บริการอาบน้ำ
                </button>
                <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 flex items-center gap-3 shadow-lg shadow-yellow-200/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  บริการตัดขน
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนแสดงการ์ดสัตว์เลี้ยง */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">ตัวอย่างสัตว์เลี้ยงที่เราดูแล</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-yellow-400 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 group">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={optimizeImage('https://images.unsplash.com/photo-1537151608828-ea2b11777ee8')}
                alt="สุนัข"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-400 to-blue-500 backdrop-blur-sm px-4 py-2 rounded-full text-white font-bold shadow-lg">
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  สุนัข
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <div className="text-4xl mb-2">🐾</div>
                  <p className="font-bold">ดูแลด้วยใจรัก</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">บริการดูแลสุนัข</h3>
              <p className="text-gray-600 mb-6">บริการอาบน้ำ ตัดขน ทำให้สุนัขของคุณสะอาด น่ารัก และดูดี ด้วยผลิตภัณฑ์คุณภาพสูง</p>
              <button className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200/50 active:scale-95">
                เลือกบริการ
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 group">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={optimizeImage('https://images.unsplash.com/photo-1543852786-1cf6624b9987')}
                alt="แมว"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 backdrop-blur-sm px-4 py-2 rounded-full text-white font-bold shadow-lg">
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  แมว
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <div className="text-4xl mb-2">🐱</div>
                  <p className="font-bold">อ่อนโยนทุกการสัมผัส</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">บริการดูแลแมว</h3>
              <p className="text-gray-600 mb-6">บริการอาบน้ำ ตัดขน ด้วยความระมัดระวัง ให้แมวของคุณนุ่มนวลน่ากอด ปลอดเชื้อ</p>
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-yellow-200/50 active:scale-95">
                เลือกบริการ
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 group">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={optimizeImage('https://images.unsplash.com/photo-1519825176126-aa0b94eee286')}
                alt="กระต่าย"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-green-500 backdrop-blur-sm px-4 py-2 rounded-full text-white font-bold shadow-lg">
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  กระต่าย
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <div className="text-4xl mb-2">🐰</div>
                  <p className="font-bold">นุ่มนวลทุกเส้นขน</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">บริการดูแลกระต่าย</h3>
              <p className="text-gray-600 mb-6">บริการอาบน้ำ ตัดขน ดูแลขนของกระต่ายให้สวยงามนุ่มนวล ด้วยเทคนิคพิเศษ</p>
              <button className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-200/50 active:scale-95">
                เลือกบริการ
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Grid ของการ์ดบริการ */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">บริการของเราที่คุณเลือกได้</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-blue-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <ServiceCard 
              key={service._id} 
              service={service} 
              onBook={() => navigate(`/booking/${service._id}`, { state: service })} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;