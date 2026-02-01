import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
    else setUser(null);
    // update when other tabs change auth
    const onStorage = (e) => {
      if (e.key === "user") setUser(e.newValue ? JSON.parse(e.newValue) : null);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const btnBase = "inline-flex items-center gap-3 px-4 h-10 rounded-lg text-sm font-medium justify-center focus:outline-none focus:ring-2 focus:ring-pet-blue-100 transition transform hover:-translate-y-0.5";

  return (
    <nav className="bg-gradient-to-r from-pet-yellow-50/60 to-pet-blue-50/60 backdrop-blur sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 h-16">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-pet-yellow-100 rounded-md px-3 py-1.5 hover:-translate-y-0.5 transform transition h-12"
            aria-label="ไปที่หน้าแรก"
            title="ไปที่หน้าแรก"
          >
            <div className="w-1 h-10 rounded-md bg-gradient-to-b from-pet-yellow-100 to-pet-blue-100" />
            <div className="flex items-center gap-4 pl-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pet-yellow-100 to-pet-blue-100 flex items-center justify-center font-bold">
                {/* Paw SVG */}
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 13c-2 0-6 1.5-6 4v1h12v-1c0-2.5-4-4-6-4z" fill="currentColor" />
                  <path d="M6.5 7.5a1.9 1.9 0 11-3.8 0 1.9 1.9 0 013.8 0zM18 9a2 2 0 110-4 2 2 0 010 4zM9 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM17.5 7.5a1.9 1.9 0 11-3.8 0 1.9 1.9 0 013.8 0z" fill="currentColor" />
                </svg>
              </div>
              <div className="text-xl font-bold">Pet Care</div>
            </div>
          </button>
        </div>

        {/* Main menu */}
        <div className="flex items-center gap-6 flex-wrap ml-auto">
          <Link to="/booking" className={`${btnBase} bg-white/80 text-pet-blue-600 ring-1 ring-white/60 hover:bg-white`} role="button" title="จองบริการ">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M7 11h10M7 16h10M7 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>จองบริการ</span>
          </Link>

          <Link to="/history" className={`${btnBase} border bg-white`} role="button" title="ประวัติ">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>ประวัติ</span>
          </Link>

          {!user ? (
            <>
              <Link to="/login" className={`${btnBase} border bg-white`} role="button" title="เข้าสู่ระบบ">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>เข้าสู่ระบบ</span>
              </Link>

              <Link to="/register" className={`${btnBase} bg-gradient-to-r from-pet-yellow-400 to-pet-blue-400 text-white btn-shadow`} role="button" title="สมัครสมาชิก">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 20a6 6 0 0112 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>สมัครสมาชิก</span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-3 py-1 rounded-md bg-slate-100">
                <div className="w-8 h-8 rounded-full bg-pet-yellow-50 flex items-center justify-center text-sm font-semibold">{user.username?.charAt(0)?.toUpperCase() || "U"}</div>
                <div className="text-sm">{user.username}</div>
              </div>
              <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm border">ออกจากระบบ</button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="sm:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="เมนู" className="p-2 rounded-md border">
            {menuOpen ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className={`sm:hidden ${menuOpen ? 'block' : 'hidden'} border-t bg-white/95 shadow-lg rounded-b-lg`}> 
        <div className="p-4 flex flex-col gap-3 max-w-4xl mx-auto">
          <Link to="/booking" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-md bg-white/80 text-pet-blue-600 ring-1 ring-white/60 hover:bg-white">จองบริการ</Link>
          <Link to="/history" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-md border">ประวัติ</Link>

          {!user ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md border">เข้าสู่ระบบ</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-pet-yellow-400 to-pet-blue-400 text-white">สมัครสมาชิก</Link>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100">
                <div className="w-8 h-8 rounded-full bg-pet-yellow-50 flex items-center justify-center text-sm font-semibold">{user.username?.charAt(0)?.toUpperCase() || "U"}</div>
                <div className="text-sm">{user.username}</div>
              </div>
              <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="px-3 py-2 rounded-md text-sm border">ออกจากระบบ</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
