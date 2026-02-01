import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import PetCard from "../components/PetCard";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";

const PET_TYPES = [
  { id: "dog", name: "สุนัข", imageUrl: "/pets/dog.jpg" },
  { id: "cat", name: "แมว", imageUrl: "/pets/cat.jpg" },
  { id: "bird", name: "นก", imageUrl: "/pets/bird.jpg" },
  { id: "other", name: "อื่น ๆ", imageUrl: "/pets/other.svg" }
];

export default function Home() {
  const navigate = useNavigate();
  const [hero, setHero] = React.useState(null);

  React.useEffect(() => {
    async function fetchHero() {
      try {
        const res = await fetch('/api/uploads/hero');
        if (!res.ok) return;
        const data = await res.json();
        setHero(data.imageUrl);
      } catch (err) {
        console.error('Cannot fetch hero', err);
      }
    }
    fetchHero();
    const onHeroUpdated = () => fetchHero();
    window.addEventListener('hero-updated', onHeroUpdated);
    return () => window.removeEventListener('hero-updated', onHeroUpdated);
  }, []);

  // compute pet data with possible cropping
  const petCards = PET_TYPES.map((p, i) => {
    const pos = i === 0 ? 'left' : i === 2 ? 'right' : 'center';
    return {
      ...p,
      // Use each pet's own image so name matches the picture
      imageUrl: p.imageUrl,
      objectPosition: pos === 'left' ? 'left center' : pos === 'right' ? 'right center' : 'center center'
    };
  });

  return (
    <div className="space-y-6 app-container">
      <section className="py-6">
        <div className="content-surface">
          <h1 className="text-2xl section-title">ยินดีต้อนรับสู่ Pet Care</h1>
          <p className="mt-2 text-sm text-gray-700">เลือกสัตว์เลี้ยงของคุณเพื่อดูบริการที่เหมาะสม</p>
          <Link to="/booking" className="inline-block mt-4 px-4 py-2 rounded-md bg-gradient-to-r from-pet-yellow-400 to-pet-blue-400 text-white btn-shadow">ดูบริการทั้งหมด</Link>
        </div>
      </section>

      {/* Hero banner */}
      <Hero />

      <section>
        <div className="text-sm mb-2 section-title">เลือกสัตว์เลี้ยง</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {petCards.map((p) => (
            <div key={p.id} className="bg-white/95 rounded-lg p-2 flex items-center justify-center border border-white/60">
              <PetCard
                id={p.id}
                name={p.name}
                imageUrl={p.imageUrl}
                objectPosition={p.objectPosition}
                selected={false}
                onSelect={() => navigate(`/booking?pet=${p.id}`)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Gallery + Upload */}
      <section>
        <div className="flex items-center justify-between">
          <div className="text-sm mb-2 section-title">แกลเลอรีรูปสัตว์</div>
          <div className="text-xs text-gray-500">คลิกเพื่อเลือกแล้วไปจอง</div>
        </div>

        <Gallery />

      </section>
    </div>
  );
}
