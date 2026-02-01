import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';
import History from './pages/History';
import Register from './pages/Register'; // หน้าสมัครสมาชิกที่คุณต้องการ
import Login from './pages/Login';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';

// Set up axios interceptor to include token in requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Also intercept responses to handle token expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App; // ต้องมีบรรทัดนี้เสมอ