/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. เพิ่มการสแกนไฟล์ให้ครอบคลุมมากขึ้น
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'pet-yellow': {
          50: '#fff9e6',
          100: '#fff3cc',
          400: '#fbbf24', // เพิ่มสีหลักสำหรับปุ่ม
          500: '#f59e0b',
        },
        'pet-blue': {
          50: '#e6fbff',
          100: '#ccf7ff',
          400: '#60a5fa', // เพิ่มสีหลักสำหรับปุ่ม
          600: '#2563eb',
        }
      },
      // 2. เพิ่ม Animation สำหรับตกแต่ง (Optional)
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    }
  },
  plugins: []
};