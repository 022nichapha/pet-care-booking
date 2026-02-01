import React from "react";

export default function PetCard({ id, name, Icon, imageUrl, selected, onSelect, objectPosition }) {
  // Card with image box and centered label below (matches sample)
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`group flex flex-col items-stretch p-0 rounded-lg overflow-hidden bg-white/95 border transition transform ${selected ? "ring-2 ring-pet-blue-100 shadow-lg" : "hover:shadow-md hover:-translate-y-0.5"}`}
      aria-pressed={selected}
      aria-label={name}
      title={name}
    >
      <div className={`w-full sm:w-40 h-40 sm:h-40 rounded-t-md overflow-hidden flex items-center justify-center border-b bg-white`}>
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover pet-card-img" style={{ objectPosition: typeof objectPosition === 'string' ? objectPosition : 'center center' }} />
        ) : (
          Icon && <Icon className="w-8 h-8 text-pet-blue-600" />
        )}
      </div>
      <div className="text-center text-sm font-medium py-2 border-t bg-pet-yellow-50">{name}</div>
    </button>
  );
}
