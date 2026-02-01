import React from "react";

export default function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-gradient-to-r from-pet-yellow-400 to-pet-blue-400 text-white px-4 py-2 rounded-lg font-semibold btn-shadow transition transform hover:-translate-y-0.5 hover:shadow-lg active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
} 
