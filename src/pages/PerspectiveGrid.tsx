import './PerspectiveGrid.css';
import { useState, useEffect } from 'react';

export default function PerspectiveGrid() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized position (0 to 1) from screen center
      const x = -((e.clientX / window.innerWidth) - 0.5);
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Calculate normalized position from touch
      const touch = e.touches[0];
      const x = -((touch.clientX / window.innerWidth) - 0.5);
      const y = (touch.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Create grid cells - 15x10 grid
  const gridCells = [];
  for (let i = 0; i < 150; i++) {
    gridCells.push(i);
  }

  // Calculate rotation based on mouse position
  const rotateX = 65 + mousePos.y * 5;
  const rotateZ = -15 + mousePos.x * 8;
  const skew = mousePos.x * 2;

  return (
    <div className="perspective-grid-container">
      <div
        className="perspective-grid"
        style={{
          transform: `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) skewY(${skew}deg) translateZ(0)`,
        }}
      >
        {gridCells.map((cell) => (
          <div key={cell} className="grid-cell"></div>
        ))}
      </div>
    </div>
  );
}
