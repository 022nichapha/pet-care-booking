import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white/95 rounded-lg p-4 shadow-md border border-white/60 hover:shadow-lg transition ${className}`}>
      {children}
    </div>
  );
}
