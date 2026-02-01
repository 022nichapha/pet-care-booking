import React, { useState, useEffect } from "react";
import Button from "./Button";
import PetCard from "./PetCard";
import { useNavigate, useLocation } from "react-router-dom";

const SERVICES = [
  { value: "grooming", label: "อาบน้ำ-ตัดขน" },
  { value: "boarding", label: "รับฝากสัตว์เลี้ยง" },
  { value: "walking", label: "พาเดินเล่น" }
];

const PET_TYPES = [
  { id: "dog", name: "สุนัข", imageUrl: "/pets/dog.jpg" },
  { id: "cat", name: "แมว", imageUrl: "/pets/cat.jpg" },
  { id: "bird", name: "นก", imageUrl: "/pets/bird.jpg" },
  { id: "other", name: "อื่น ๆ", imageUrl: "/pets/other.svg" }
];

export default function BookingForm() {
  const [data, setData] = useState({
    service: "grooming",
    date: "",
    time: "",
    name: "",
    phone: "",
    petName: "",
    notes: "",
    petType: "dog"
  });
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [previewPosition, setPreviewPosition] = useState('center center');
  const navigate = useNavigate();
  const location = useLocation();

  // หากมี ?pet=xxx ใน URL ให้ตั้งค่า petType ตามนั้น
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pet = params.get('pet');
    if (pet && PET_TYPES.some(p => p.id === pet)) {
      setData(d => ({ ...d, petType: pet }));
    }
  }, [location.search]);

  // สร้าง preview เมื่อผู้ใช้เลือกไฟล์
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // ถ้ามี ?image=... ให้ตั้ง preview และ data.imageUrl เพื่อไม่ต้องอัปโหลดซ้ำ
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const image = params.get('image');
    const crop = params.get('crop');
    if (image) {
      setPreview(image);
      setData(d => ({ ...d, imageUrl: image }));
      setFile(null);
    }
    if (crop) {
      if (crop === 'left') setPreviewPosition('left center');
      else if (crop === 'right') setPreviewPosition('right center');
      else setPreviewPosition('center center');
    }
  }, [location.search]);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    if (!data.petType || !data.date || !data.time || !data.name || !data.phone || !data.petName) {
      setError("กรุณากรอกข้อมูลที่จำเป็นทั้งหมด (รวมการเลือกสัตว์เลี้ยง)");
      return;
    }
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    // ถ้ามีไฟล์ให้ส่งขึ้น server ก่อน และเก็บ imageUrl ที่ได้
    let imageUrl = null;
    if (file) {
      const form = new FormData();
      form.append('image', file);
      const res = await fetch('/api/uploads', { method: 'POST', body: form });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'ไม่สามารถอัปโหลดรูปภาพได้');
      }
      const r = await res.json();
      imageUrl = r.imageUrl;
    }

    const newBooking = {
      id: Date.now(),
      ...data,
      imageUrl,
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    navigate("/history");
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}

      {/* Pet selection cards */}
      <div>
        <div className="text-sm mb-2">เลือกสัตว์เลี้ยง</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PET_TYPES.map(p => (
            <PetCard key={p.id} id={p.id} name={p.name} Icon={p.Icon} imageUrl={p.imageUrl} selected={data.petType === p.id} onSelect={(id) => setData({ ...data, petType: id })} />
          ))}
        </div>

        {/* Preview of selected pet */}
        <div className="mt-3">
          <div className="text-sm mb-1">ตัวอย่างสัตว์ที่เลือก</div>
          <div className="w-full sm:w-72 rounded-lg overflow-hidden border p-3 bg-white/95 flex items-center gap-3">
            <div className="w-24 h-24 rounded-md overflow-hidden border">
              <img src={PET_TYPES.find(p => p.id === data.petType)?.imageUrl} alt={data.petType} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-medium">{PET_TYPES.find(p => p.id === data.petType)?.name}</div>
              <div className="text-xs text-gray-500">เปลี่ยนได้โดยคลิกการ์ดด้านบน</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <div className="text-sm">บริการ</div>
          <select name="service" value={data.service} onChange={handleChange} className="mt-1 w-full rounded-lg p-3 border border-gray-200 focus:ring-2 focus:ring-pet-blue-100 transition">
            {SERVICES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </label>
        <label className="block">
          <div className="text-sm">วันที่</div>
          <input name="date" type="date" value={data.date} onChange={handleChange} className="mt-1 w-full rounded-lg p-3 border border-gray-200 focus:ring-2 focus:ring-pet-blue-100 transition" />
        </label>
      </div>

      {/* Upload pet image */}
      <label className="block">
        <div className="text-sm">รูปสัตว์ (JPEG/PNG)</div>
        <div className="mt-1 flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="file:mr-4 file:p-2 file:rounded-md file:border file:border-slate-200 file:bg-pet-blue-50 file:text-pet-blue-600"
          />
          {preview && (
            <div className="w-20 h-20 rounded-md overflow-hidden border border-gray-200 shadow-sm">
              <img src={preview} alt="preview" className="w-full h-full object-cover" style={{ objectPosition: previewPosition }} />
            </div>
          )}
          {file && <button type="button" className="text-sm text-red-600" onClick={() => setFile(null)}>ลบภาพ</button>}
        </div>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <div className="text-sm">เวลา</div>
          <input name="time" type="time" value={data.time} onChange={handleChange} className="mt-1 w-full rounded-lg p-3 border border-gray-200 focus:ring-2 focus:ring-pet-blue-100 transition" />
        </label>
        <label className="block">
          <div className="text-sm">ชื่อเจ้าของ</div>
          <input name="name" value={data.name} onChange={handleChange} className="mt-1 w-full rounded-lg p-3 border border-gray-200 focus:ring-2 focus:ring-pet-blue-100 transition" placeholder="ชื่อ-นามสกุล" />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <div className="text-sm">เบอร์โทร</div>
          <input name="phone" value={data.phone} onChange={handleChange} className="mt-1 w-full rounded-lg p-3 border border-gray-200 focus:ring-2 focus:ring-pet-blue-100 transition" placeholder="0812345678" />
        </label>
        <label className="block">
          <div className="text-sm">ชื่อสัตว์เลี้ยง</div>
          <input name="petName" value={data.petName} onChange={handleChange} className="mt-1 w-full rounded-lg p-3 border border-gray-200 focus:ring-2 focus:ring-pet-blue-100 transition" placeholder="ชื่อน้อง" />
        </label>
      </div>
      <label className="block">
        <div className="text-sm">หมายเหตุ (ถ้ามี)</div>
        <textarea name="notes" value={data.notes} onChange={handleChange} className="mt-1 w-full rounded-lg p-3 border border-gray-200 focus:ring-2 focus:ring-pet-blue-100 transition" rows="3" />
      </label>

      <div className="flex gap-3">
        <Button type="submit">ส่งคำขอจอง</Button>
        <Button type="button" className="bg-white text-pet-blue-600 border border-gray-200" onClick={() => {
          setData({ service: "grooming", date: "", time: "", name: "", phone: "", petName: "", notes: "" });
          setError("");
        }}>ล้าง</Button>
      </div>
    </form>
  );
}
