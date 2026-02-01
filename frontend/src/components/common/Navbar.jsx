import { Link, useNavigate } from 'react-router-dom';

// Utility function to remove token from localStorage
const removeToken = () => {
  localStorage.removeItem('token');
};

const Navbar = () => {
  const navigate = useNavigate();
  
  // Utility function to get token from localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  };
  
  const handleLogout = () => {
    removeToken();
    navigate('/');
    window.location.reload(); // Refresh to update UI
  };
  
  // Check if user is logged in
  const isLoggedIn = !!getToken();
  
  return (
    <nav className="bg-gradient-to-r from-blue-50 via-blue-50 to-yellow-50 shadow-xl sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500 flex items-center gap-2">
          <span className="text-2xl">🐾</span> PetCare
        </Link>
        <div className="flex gap-5 font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600 transition flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            หน้าแรก
          </Link>
          <Link to="/history" className="hover:text-blue-600 transition flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            ประวัติการจอง
          </Link>
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 transition flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              ออกจากระบบ
            </button>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:text-blue-700 transition flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                เข้าสู่ระบบ
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-full hover:from-blue-600 hover:to-blue-700 transition flex items-center gap-2 shadow-md hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                สมัครสมาชิก
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// ✅ เพิ่มบรรทัดนี้ครับ
export default Navbar;