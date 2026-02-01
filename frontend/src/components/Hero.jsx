import React, { useEffect, useState } from "react";

export default function Hero() {
  const [hero, setHero] = useState(null);

  async function fetchHero() {
    try {
      const res = await fetch('/api/uploads/hero');
      if (!res.ok) throw new Error('ไม่สามารถดึง hero ได้');
      const data = await res.json();
      setHero(data.imageUrl);
    } catch (err) {
      console.error('Hero fetch error', err);
    }
  }

  useEffect(() => {
    fetchHero();
    const onHeroUpdated = () => fetchHero();
    window.addEventListener('hero-updated', onHeroUpdated);
    return () => window.removeEventListener('hero-updated', onHeroUpdated);
  }, []);

  // For pet card cropping, compute three URLs using same hero with query params for object-position
  const cards = [
    { id: 'dog', pos: 'left' },
    { id: 'cat', pos: 'center' },
    { id: 'bird', pos: 'right' }
  ];

  return (
    <section>
      <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-pet-yellow-50/40 to-pet-blue-50/40 shadow-md">
        {hero ? (
          <img src={hero} alt="hero" className="w-full h-56 object-cover object-center" />
        ) : (
          <div className="w-full h-56 flex items-center justify-center text-gray-500">ไม่มีภาพหน้าแรก</div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" aria-hidden />
        <div className="absolute inset-0 flex items-center justify-end pr-6">
          <button onClick={() => window.location.href = '/booking'} className="bg-gradient-to-r from-pet-yellow-400 to-pet-blue-400 text-white px-4 py-2 rounded-lg btn-shadow hover:-translate-y-0.5 transition">จองตอนนี้</button>
        </div>

        {/* quick pick from hero - show cropped previews */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-xl shadow-lg flex gap-3 z-10">
          {hero ? cards.map(c => (
            <button key={c.id} onClick={() => window.location.href = `/booking?image=${encodeURIComponent(hero)}&crop=${c.pos}`} className="w-28 h-28 overflow-hidden rounded-md border shadow-sm hover:scale-105 transition transform">
              <img src={hero} alt={c.id} className={`w-full h-full object-cover ${c.pos === 'left' ? 'object-left' : c.pos === 'right' ? 'object-right' : 'object-center'}`} />
              <div className="text-xs text-center">{c.id === 'dog' ? 'สุนัข' : c.id === 'cat' ? 'แมว' : 'นก'}</div>
            </button>
          )) : (
            <></>
          )}
        </div>
      </div>
      <div className="h-8" />
    </section>
  );
}
