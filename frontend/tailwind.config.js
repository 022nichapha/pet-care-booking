/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // สแกนทุกไฟล์ในโฟลเดอร์ src ที่เป็น js, jsx, ts, tsx
  ],
  theme: {
    extend: {
      // คุณสามารถเพิ่มสี หรือ ฟอนต์ สำหรับ Pet Care ของคุณตรงนี้ได้
      colors: {
        'brand-primary': '#5D5FEF', 
        'light-blue': '#bfdbfe',
        'light-yellow': '#fefbb6',
        'pet-blue': '#60a5fa',
        'pet-yellow': '#fde047',
      }
    },
  },
  plugins: [],
}