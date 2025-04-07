import { useRef, useState } from 'react';

type ScrollCarouselProps = {
  items: { src: string; title?: string; onClick?: () => void }[];
};

export function ScrollCarousel({ items }: ScrollCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [moved, setMoved] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setMoved(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    if (Math.abs(walk) > 5) setMoved(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    snapToNearestItem();
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    snapToNearestItem();
  };

  const snapToNearestItem = () => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const children = Array.from(container.children[0].children) as HTMLElement[];

    let closestChild: HTMLElement | null = null;
    let closestDistance = Infinity;

    for (const child of children) {
      const distance = Math.abs(child.offsetLeft - container.scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestChild = child;
      }
    }

    if (closestChild) {
      container.scrollTo({
        left: closestChild.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleItemClick = (onClick?: () => void) => {
    if (!moved && onClick) onClick();
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current && e.deltaY !== 0) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-x-auto cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
    >
      <div className="flex gap-4 p-4">
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => handleItemClick(item.onClick)}
            className="min-w-[240px] h-[240px] rounded-lg bg-gray-100 overflow-hidden shadow cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover rounded-lg shadow-md"
              //className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
