import { useEffect, useRef } from 'react';

const NeonCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const clickEffectRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const isInteractingRef = useRef(false);

  useEffect(() => {
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice()) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      
      positionRef.current = { x: e.clientX, y: e.clientY };
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
      
      // Ocultar cursor nativo
      document.body.style.cursor = 'none';
    };

    const handleMouseDown = () => {
      if (!clickEffectRef.current || !cursorRef.current) return;
      
      isInteractingRef.current = true;
      cursorRef.current.style.transform = 'translate(-50%, -50%) scale(0.7)';
      
      clickEffectRef.current.style.left = `${positionRef.current.x}px`;
      clickEffectRef.current.style.top = `${positionRef.current.y}px`;
      clickEffectRef.current.style.opacity = '1';
      clickEffectRef.current.style.transform = 'translate(-50%, -50%) scale(0)';
      
      setTimeout(() => {
        if (clickEffectRef.current) {
          clickEffectRef.current.style.transform = 'translate(-50%, -50%) scale(3)';
          clickEffectRef.current.style.opacity = '0';
        }
      }, 10);
    };

    const handleMouseUp = () => {
      isInteractingRef.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    const handleElementHover = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.hasAttribute('data-cursor-hover');
      
      if (isInteractive) {
        cursorRef.current.classList.add('hover-effect');
        document.body.style.cursor = 'none';
      } else {
        cursorRef.current.classList.remove('hover-effect');
        // Restaurar cursor nativo cuando sea necesario
        if (target.isContentEditable || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          document.body.style.cursor = 'auto';
        } else {
          document.body.style.cursor = 'none';
        }
      }
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
      document.body.style.cursor = 'auto'; // Restaurar cursor al desmontar
    };
  }, []);

  return (
    <>
      <div className="cursor-neon" ref={cursorRef} />
      <div className="cursor-click-effect" ref={clickEffectRef} />
    </>
  );
};

export default NeonCursor;