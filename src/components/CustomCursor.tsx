import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth movement or just style directly
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Traverse up to find data-cursor attribute
      const cursorTarget = target.closest('[data-cursor]');
      
      if (cursorTarget) {
        setText(cursorTarget.getAttribute('data-cursor') || 'VIEW');
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${active ? 'active' : ''}`}
    >
      {text}
    </div>
  );
};
