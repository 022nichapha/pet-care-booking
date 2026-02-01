import React from "react";
import Card from "../components/Card";
import BookingForm from "../components/BookingForm";

export default function BookingPage() {
  return (
    <div className="py-6">
      <Card>
        <h2 className="text-xl font-semibold mb-2">ฟอร์มจองบริการ</h2>
        <BookingForm />
      </Card>
    </div>
  );
}
