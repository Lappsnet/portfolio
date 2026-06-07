import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SLIDES = [
  {
    img: '/portfolio/images/photo1.jpg',
    tag: 'CONFERENCE',
    title: 'LaBitConf 2023',
    role: 'Speaker & Hackathon Winner',
    stamp: 'SAN SALVADOR · 2023',
  },
  {
    img: '/portfolio/images/photo2.jpg',
    tag: 'HACKATHON',
    title: 'Solana/Wormhole Hackathon',
    role: '1st Place — Blockchain Track',
    stamp: 'ONLINE · 2022',
  },
  {
    img: '/portfolio/images/photo3.jpg',
    tag: 'FUNDRAISE',
    title: '$5M Seed Round — Intmax',
    role: 'Head of Business Development',
    stamp: 'GLOBAL · 2023',
  },
  {
    img: '/portfolio/images/photo4.jpg',
    tag: 'PRODUCT',
    title: 'BitTasker Launch',
    role: 'Co-Founder & Growth Lead',
    stamp: 'EL SALVADOR · 2025',
  },
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const slideRefs = useRef([]);
  const wrapRef = useRef(null);
  const thumbRefs = useRef([]);
  const progressFillRef = useRef(null);
  const transitioning = useRef(false);

  const goTo = useCallback((idx) => {
    if (transitioning.current || idx === current) return;
    transitioning.current = true;
    setPrev(current);
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [goTo, current]);
  const prev_ = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [goTo, current]);

  useEffect(() => {
    const curEl = slideRefs.current[current];
    const prevEl = prev !== null ? slideRefs.current[prev] : null;

    if (prevEl) {
      prevEl.classList.remove('active');
      gsap.to(prevEl, { opacity: 0, duration: 0.4, ease: 'power2.in' });
    }

    if (curEl) {
      curEl.classList.add('active');
      gsap.fromTo(curEl, { opacity: 0, filter: 'brightness(3)' }, {
        opacity: 1, filter: 'brightness(1)', duration: 0.5, ease: 'power2.out',
        onComplete: () => { transitioning.current = false; }
      });
    }

    thumbRefs.current.forEach((t, i) => {
      if (t) t.classList.toggle('sl-thumb active', i === current);
    });

    // Update progress
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${((current + 1) / SLIDES.length) * 100}%`;
    }
  }, [current, prev]);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  // Keyboard
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev_();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev_]);

  // ScrollTrigger entrance
  useEffect(() => {
    if (!wrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(wrapRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 80%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" className="section">
      <div className="stag">PHOTO_ARCHIVE</div>
      <div className="slider-wrap" ref={wrapRef}>
        <div className="slider-stage">
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className={`slide${i === 0 ? ' active' : ''}`}
              ref={(el) => (slideRefs.current[i] = el)}
            >
              <img src={s.img} alt={s.title} />
              <div className="slide-scan" />
              <div className="slide-overlay">
                <div className="slide-meta">
                  <span className="slide-tag">{s.tag}</span>
                  <h3 className="slide-title">{s.title}</h3>
                  <span className="slide-role">{s.role}</span>
                </div>
              </div>
              <span className="slide-stamp">{s.stamp}</span>
            </div>
          ))}

          <button className="sl-arrow sl-prev" onClick={prev_} aria-label="Previous">
            <svg viewBox="0 0 24 24"><polyline points="15,18 9,12 15,6" /></svg>
          </button>
          <button className="sl-arrow sl-next" onClick={next} aria-label="Next">
            <svg viewBox="0 0 24 24"><polyline points="9,18 15,12 9,6" /></svg>
          </button>

          <div className="sl-progress">
            <div className="sl-progress-fill" ref={progressFillRef} style={{ width: '25%' }} />
          </div>
        </div>

        <div className="sl-thumbs">
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className={`sl-thumb${i === 0 ? ' active' : ''}`}
              ref={(el) => (thumbRefs.current[i] = el)}
              onClick={() => goTo(i)}
            >
              <img src={s.img} alt={s.title} />
              <span>{s.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
