import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const VIDEOS = [
  { id: 'LfRegUQLoBI', ts: 48, title: 'Intmax Protocol Deep Dive', label: 'ZK-Rollup Explainer' },
  { id: 'eR2k5eT5yzI', ts: 23, title: 'Lightning Network Payments', label: 'BitTasker Demo', hq: true },
  { id: '0rPCdNiE49U', ts: 6, title: 'LaBitConf Presentation', label: 'Conference Talk' },
  { id: '9gBZCnLNmc8', ts: 6, title: 'DeFi Protocol Architecture', label: 'Technical Talk' },
  { id: 'XYYs68_oPAQ', ts: 62, title: 'Wormhole Cross-Chain Demo', label: 'Hackathon Winner' },
  { id: 'Us3sN3SfQcs', ts: 7, title: 'RWA Tokenization Explained', label: 'Educational' },
  { id: 'WP1tKw0tqVU', ts: 0, title: 'Lappsnet Protocol Overview', label: 'ETH Grant Project' },
  { id: 'a9Pz5tKmRG4', ts: 0, title: 'Blockchain BD Strategy', label: 'Growth Talk' },
];

export default function Videos() {
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.yc', {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);

    function onKey(e) {
      if (e.key === 'Escape') setActiveVideo(null);
    }
    window.addEventListener('keydown', onKey);

    return () => {
      ctx.revert();
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // Animate modal open/close
  useEffect(() => {
    if (modalRef.current) {
      if (activeVideo) {
        modalRef.current.classList.add('open');
      } else {
        modalRef.current.classList.remove('open');
      }
    }
  }, [activeVideo]);

  return (
    <section id="videos" className="section" ref={sectionRef}>
      <div className="sc">// CONTENT_ARCHIVE</div>
      <div className="stag">VIDEOS</div>
      <h2 className="stitle">Watch My Work <em>in Action</em></h2>

      <div className="yg">
        {VIDEOS.map((v) => {
          const thumb = v.hq
            ? `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`
            : `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`;
          return (
            <div key={v.id} className="yc" onClick={() => setActiveVideo(v)}>
              <img src={thumb} alt={v.title} className="yt" />
              <div className="yo">
                <div className="yp">
                  <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
                </div>
                <span className="ytag">{v.label}</span>
                <span className="ytitle">{v.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="yt-modal" ref={modalRef} onClick={() => setActiveVideo(null)}>
        <div className="mi" onClick={(e) => e.stopPropagation()}>
          <button className="mc" onClick={() => setActiveVideo(null)}>[ CLOSE ]</button>
          {activeVideo && (
            <iframe
              className="mf"
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&start=${activeVideo.ts}`}
              title={activeVideo.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  );
}
