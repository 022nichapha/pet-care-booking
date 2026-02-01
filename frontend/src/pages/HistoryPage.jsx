import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

export default function HistoryPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const b = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(b);
  }, []);

  function remove(id) {
    const b = bookings.filter(x => x.id !== id);
    localStorage.setItem("bookings", JSON.stringify(b));
    setBookings(b);
  }

  const PET_LABELS = {
    dog: "🐶 สุนัข",
    cat: "🐱 แมว",
    bird: "🐦 นก",
    other: "🦊 อื่น ๆ"
  };

  return (
    <div className="py-6 space-y-4">
      <h2 className="text-xl font-semibold">ประวัติการจอง</h2>
      {bookings.length === 0 && <div className="text-gray-600">ยังไม่มีการจอง</div>}
      <div className="grid grid-cols-1 gap-3">
        {bookings.map(b => (
          <Card key={b.id} className="flex justify-between items-start">
            <div>
              <div className="font-semibold">{b.service === "grooming" ? "อาบน้ำ-ตัดขน" : b.service === "boarding" ? "รับฝาก" : "พาเดินเล่น"}</div>
              <div className="text-sm text-gray-600">วันที่ {b.date} เวลา {b.time}</div>
              <div className="text-sm text-gray-600 mt-1">เจ้าของ: {b.name} | สัตว์: {b.petName} • <span className="ml-2">{PET_LABELS[b.petType] || b.petType}</span></div>
              {b.imageUrl && (
                <div className="mt-2">
                  <img src={b.imageUrl} alt="pet" className="w-28 h-28 object-cover rounded-md border" />
                </div>
              )}
              {b.notes && <div className="text-sm mt-1">หมายเหตุ: {b.notes}</div>}
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xs text-gray-500">{new Date(b.createdAt).toLocaleString()}</div>
              <Button className="bg-white text-red-600" onClick={() => remove(b.id)}>ยกเลิก</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
