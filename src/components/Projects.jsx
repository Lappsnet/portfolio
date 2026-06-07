import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PROJECTS = [
  {
    badgeClass: 'bf',
    badge: 'FLAGSHIP',
    cardClass: 'feat',
    title: 'INTMAX',
    desc: "Led business development for the world's lightest Ethereum Layer 2 — a stateless ZK-Rollup achieving maximum privacy with minimal on-chain footprint.",
    bullets: [
      'Closed $5M seed round with tier-1 crypto VCs',
      'Established 30+ institutional partnerships across Asia, Europe & Americas',
      'Drove protocol adoption reaching 50K+ testnet wallets',
      'Represented at ETHGlobal, DevConnect, Token2049, and Consensus',
    ],
    tags: ['ZK-Rollup', 'Ethereum L2', 'BD', 'DeFi', 'Privacy'],
    href: 'https://intmax.io',
  },
  {
    badgeClass: 'bb',
    badge: 'BITCOIN',
    cardClass: '',
    title: 'BITTASKER',
    desc: 'Co-founded and launched a Bitcoin-native freelance marketplace where tasks are paid instantly via Lightning Network micropayments — no banks, no borders.',
    bullets: [
      'Built full-stack platform from concept to production launch',
      'Integrated Lightning Network for instant sub-cent payments',
      'Featured in Diario El Salvador and national media',
      'Grew to 500+ registered users in first 3 months',
    ],
    tags: ['Bitcoin', 'Lightning Network', 'Marketplace', 'Co-Founder'],
    href: 'https://bittasker.xyz',
  },
  {
    badgeClass: 'bw',
    badge: 'ETH GRANT',
    cardClass: '',
    title: 'LAPPSNET',
    desc: 'Founded an Ethereum grant-funded protocol pioneering RWA tokenization and cross-chain DeFi infrastructure for underserved markets in Central America.',
    bullets: [
      'Secured Ethereum Foundation grant for infrastructure development',
      'Built cross-chain bridge architecture for EVM-compatible chains',
      'Pioneered real-world asset tokenization for property and SMBs',
      'Won Solana/Wormhole hackathon (1st place) using the protocol',
    ],
    tags: ['Ethereum', 'RWA', 'Cross-Chain', 'Grant', 'DeFi'],
    href: 'https://lappsnet.com',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.to(card, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });
      });
    }, sectionRef);

    const cards = cardRefs.current.filter(Boolean);
    const handlers = cards.map((card) => {
      function onMove(e) {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
        gsap.to(card, { rotationY: dx * 10, rotationX: -dy * 6, duration: 0.3, ease: 'power2.out', transformPerspective: 900 });
      }
      function onLeave() {
        gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.6, ease: 'elastic.out(1,0.7)' });
      }
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      return { card, onMove, onLeave };
    });

    return () => {
      ctx.revert();
      handlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <div className="sc">// BUILD_LOG</div>
      <div className="stag">PROJECTS</div>
      <h2 className="stitle">Projects I&apos;ve <em>Built &amp; Scaled</em></h2>

      <div className="pg">
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className={`pc${p.cardClass ? ' ' + p.cardClass : ''}`}
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <div className="btl" />
            <div className="bbr" />
            <span className={`pb ${p.badgeClass}`}>{p.badge}</span>
            <h3 className="pt">{p.title}</h3>
            <p className="pd">{p.desc}</p>
            <ul className="pl">
              {p.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <div className="ptch">
              {p.tags.map((t) => <span key={t} className="tt">{t}</span>)}
            </div>
            <a href={p.href} target="_blank" rel="noreferrer" className="plink">
              VIEW PROJECT <span>→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
