import { useState } from "react";

type CarouselProps = {
    onSelectCategory: (category: string) => void;
  };
  
  const items = [
    { src: '/assets/comida.jpg', category: 'comida' },
    { src: '/assets/musica.jpg', category: 'musica' },
    { src: '/assets/eventos.jpg', category: 'eventos' },
  ];
  
  export function Carousel({ onSelectCategory }: CarouselProps) {
    const [current, setCurrent] = useState(0);
  
    const next = () => setCurrent((prev) => (prev + 1) % items.length);
    const prev = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);
  
    return (
      <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl shadow-lg">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item, i) => (
            <img
              key={i}
              src={item.src}
              alt={item.category}
              onClick={() => onSelectCategory(item.category)}
              className="w-full flex-shrink-0 object-cover h-64 sm:h-80 cursor-pointer hover:opacity-90"
            />
          ))}
        </div>
  
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full">
          ◀
        </button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full">
          ▶
        </button>
      </div>
    );
  }
  