import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LINES = [
  '> INITIALIZING NEURAL INTERFACE...',
  '> LOADING BLOCKCHAIN PROTOCOLS_',
  '> ACCESSING JONATHAN_CRUZ.DAT',
  '> EL SALVADOR NODE: ONLINE',
  '> SYSTEM READY. WELCOME, OPERATIVE.',
];

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null);
  const lineRefs = useRef([]);
  const barRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.6,
          onComplete: () => {
            if (rootRef.current) rootRef.current.style.display = 'none';
            onComplete();
          },
        });
      },
    });

    lineRefs.current.forEach((el, i) => {
      tl.to(el, { opacity: 1, duration: 0.05 }, i * 0.45);
    });

    tl.to(barRef.current, { width: '100%', duration: 1.2, ease: 'power2.inOut' }, '+=0.2');

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div id="preloader" className="preloader" ref={rootRef}>
      <div id="boot-lines">
        {LINES.map((line, i) => (
          <div
            key={i}
            className={i === LINES.length - 1 ? 'bl e' : 'bl'}
            ref={(el) => (lineRefs.current[i] = el)}
          >
            {line}
          </div>
        ))}
      </div>
      <div className="bbar" ref={barRef} />
    </div>
  );
}
