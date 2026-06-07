import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const curRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cur = curRef.current;
    const ring = ringRef.current;
    if (!cur || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    function onMove(e) {
      mx = e.clientX;
      my = e.clientY;
      gsap.set(cur, { x: mx, y: my });
      gsap.to(ring, { x: mx, y: my, duration: 0.15, ease: 'power2.out' });
    }

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div id="cur" ref={curRef} />
      <div id="cur-ring" ref={ringRef} />
    </>
  );
}
