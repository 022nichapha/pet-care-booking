import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function fetchUploads() {
    try {
      const res = await fetch('/api/uploads');
      if (!res.ok) throw new Error('ไม่สามารถดึงรูปได้');
      const data = await res.json();
      // combine with static pets
      setItems(data || []);
    } catch (err) {
      console.error('Gallery fetch error', err);
    }
  }

  // set as hero
  async function setAsHero(imageUrl) {
    try {
      const res = await fetch('/api/uploads/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl })
      });
      if (!res.ok) throw new Error('ไม่สามารถตั้งภาพเป็น Hero ได้');
      alert('ตั้งภาพเป็นภาพหน้าแรกเรียบร้อยแล้ว');
      // Notify other components
      window.dispatchEvent(new Event('hero-updated'));
    } catch (err) {
      console.error('Set hero error', err);
      alert(err.message || 'เกิดข้อผิดพลาด');
    }
  }

  useEffect(() => {
    fetchUploads();
  }, []);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    try {
      const form = new FormData();
      form.append('image', file);
      const res = await fetch('/api/uploads', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      setFile(null);
      fetchUploads();
    } catch (err) {
      console.error('Upload error', err);
      alert(err.message || 'ไม่สามารถอัปโหลดได้');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white/90 rounded-lg p-3">
      <form onSubmit={handleUpload} className="flex items-center gap-3 mb-3">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button className="px-3 py-1 rounded-md bg-gradient-to-r from-pet-yellow-400 to-pet-blue-400 text-white btn-shadow hover:scale-105 transition" disabled={loading}>{loading ? 'กำลังอัปโหลด...' : 'อัปโหลด'}</button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {/* static pets (ensure they're always visible) */}
        <div className="p-1">
          <div className="relative group">
            <img src="/pets/dog.jpg" alt="dog" className="w-full h-24 object-cover rounded-md border cursor-pointer transform group-hover:scale-105 transition" onClick={() => navigate('/booking?image=' + encodeURIComponent('/pets/dog.jpg'))} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition rounded-md" />
            <button onClick={() => setAsHero('/pets/dog.jpg')} className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 text-xs rounded opacity-0 group-hover:opacity-100 transition">ตั้งเป็นภาพหน้าแรก</button>
            <div className="absolute bottom-0 left-0 right-0 text-xs text-center bg-white/80 py-1 rounded-b-md">สุนัข</div>
          </div>
        </div>
        <div className="p-1">
          <div className="relative group">
            <img src="/pets/cat.jpg" alt="cat" className="w-full h-24 object-cover rounded-md border cursor-pointer transform group-hover:scale-105 transition" onClick={() => navigate('/booking?image=' + encodeURIComponent('/pets/cat.jpg'))} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition rounded-md" />
            <button onClick={() => setAsHero('/pets/cat.jpg')} className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 text-xs rounded opacity-0 group-hover:opacity-100 transition">ตั้งเป็นภาพหน้าแรก</button>
            <div className="absolute bottom-0 left-0 right-0 text-xs text-center bg-white/80 py-1 rounded-b-md">แมว</div>
          </div>
        </div>
        <div className="p-1">
          <div className="relative group">
            <img src="/pets/bird.jpg" alt="bird" className="w-full h-24 object-cover rounded-md border cursor-pointer transform group-hover:scale-105 transition" onClick={() => navigate('/booking?image=' + encodeURIComponent('/pets/bird.jpg'))} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition rounded-md" />
            <button onClick={() => setAsHero('/pets/bird.jpg')} className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 text-xs rounded opacity-0 group-hover:opacity-100 transition">ตั้งเป็นภาพหน้าแรก</button>
            <div className="absolute bottom-0 left-0 right-0 text-xs text-center bg-white/80 py-1 rounded-b-md">นก</div>
          </div>
        </div>

        {/* uploaded images */}
        {items.map(i => (
          <div key={i.filename} className="p-1">
            <div className="relative group">
              <img src={i.imageUrl} alt={i.filename} className="w-full h-24 object-cover rounded-md border cursor-pointer transform group-hover:scale-105 transition" onClick={() => navigate('/booking?image=' + encodeURIComponent(i.imageUrl))} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition rounded-md" />
              <button onClick={() => setAsHero(i.imageUrl)} className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 text-xs rounded opacity-0 group-hover:opacity-100 transition">ตั้งเป็นภาพหน้าแรก</button>
              <div className="absolute bottom-0 left-0 right-0 text-xs text-center bg-white/80 py-1 rounded-b-md">{i.filename}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
