import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero({ animate }) {
  const eyeRef = useRef(null);
  const l1Ref = useRef(null);
  const l2Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const cornerRef = useRef(null);

  useEffect(() => {
    if (!animate) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(eyeRef.current, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' })
      .to(l1Ref.current, { y: '0%', duration: 0.7, ease: 'power3.out' }, '-=0.1')
      .to(l2Ref.current, { y: '0%', duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .to(statsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .to(cornerRef.current, { opacity: 1, duration: 0.4 }, '-=0.2');

    return () => tl.kill();
  }, [animate]);

  return (
    <section id="hero">
      <div className="h-eye" ref={eyeRef}>
        // BLOCKCHAIN_SPECIALIST · GROWTH_BUILDER · EL_SALVADOR_NODE
      </div>

      <div className="h-name">
        <div className="h-l1">
          <span ref={l1Ref} className="gt" data-text="JONATHAN">JONATHAN</span>
        </div>
        <div className="h-l2">
          <span ref={l2Ref}>CRUZ</span>
        </div>
      </div>

      <div className="h-sub" ref={subRef}>
        Blockchain Growth Strategist · 5+ Years in Web3 · <strong>$5M Seed Raised</strong> ·<br />
        ZK-Proofs · DeFi · RWA · Bitcoin L2 · El Salvador
      </div>

      <div className="h-cta" ref={ctaRef}>
        <a href="#projects" className="btn-p">VIEW PROJECTS</a>
        <a href="#contact" className="btn-g">INITIATE CONTACT</a>
      </div>

      <div className="h-stats" ref={statsRef}>
        <div className="stat">
          <span className="sn">$5M</span>
          <span className="sl">SEED ROUND</span>
        </div>
        <div className="stat">
          <span className="sn">5+</span>
          <span className="sl">YEARS WEB3</span>
        </div>
        <div className="stat">
          <span className="sn">4</span>
          <span className="sl">HACKATHON WINS</span>
        </div>
        <div className="stat">
          <span className="sn">20+</span>
          <span className="sl">PRESS FEATURES</span>
        </div>
      </div>

      <div className="h-corner" ref={cornerRef}>
        LAT: 13.6929° N<br />
        LON: 89.2182° W<br />
        SAN_SALVADOR_NODE_ACTIVE
      </div>
    </section>
  );
}
