import { Button } from '../common/Button';

const BookingForm = ({ serviceName, onSubmit, formData, setFormData }) => (
  <form onSubmit={onSubmit} className="space-y-8 bg-gradient-to-br from-white to-blue-50 p-8 rounded-3xl shadow-xl border border-gray-100">
    <div className="text-center mb-4">
      <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-100 to-yellow-100 p-4 rounded-full mb-4">
        <div className="text-4xl bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">📅</div>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">ข้อมูลการจอง: {serviceName}</h2>
      <p className="text-gray-600">กรุณากรอกข้อมูลด้านล่างเพื่อดำเนินการจอง</p>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        ชื่อผู้จอง
      </label>
      <input 
        type="text" required className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition"
        value={formData.customerName}
        onChange={(e) => setFormData({...formData, customerName: e.target.value})}
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        เบอร์โทรศัพท์
      </label>
      <input 
        type="tel" required className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition"
        value={formData.phoneNumber}
        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        วันที่และเวลา
      </label>
      <input 
        type="datetime-local" required className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition"
        value={formData.appointmentDate}
        onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
      />
    </div>
    <Button variant="gradient" className="w-full py-4 text-lg font-bold shadow-lg">ยืนยันการจอง</Button>
  </form>
);
export default BookingForm;