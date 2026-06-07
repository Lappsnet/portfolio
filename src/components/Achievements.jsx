import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ACHIEVEMENTS = [
  {
    icon: '🏆',
    title: 'Solana / Wormhole Hackathon',
    subtitle: '1st Place — Blockchain Track',
    desc: 'Won first place building cross-chain DeFi infrastructure with Wormhole bridge integration on Solana.',
  },
  {
    icon: '🥇',
    title: 'Impact Hub Competition',
    subtitle: '1st Place — FinTech Innovation',
    desc: "Topped a regional FinTech competition presenting Lappsnet's RWA tokenization protocol for Central America.",
  },
  {
    icon: '🌎',
    title: 'World Blockchain Cup',
    subtitle: '2nd Place — Global Finals',
    desc: 'Achieved runner-up in the global blockchain championship competing against teams from 40+ countries.',
  },
  {
    icon: '⚡',
    title: 'LaBitConf Hackathon',
    subtitle: '3rd Place — DeFi Track',
    desc: "Third place at Latin America's premier Bitcoin conference hackathon with cross-chain Lightning integration.",
  },
  {
    icon: '🔬',
    title: 'Ethereum Foundation Grant',
    subtitle: 'Infrastructure Development',
    desc: 'Received Ethereum Foundation grant for open-source cross-chain bridge and RWA tokenization research.',
  },
  {
    icon: '💰',
    title: '$5M Seed Round Closed',
    subtitle: 'Intmax / Ryodan Systems',
    desc: "Led fundraising to secure $5M from tier-1 crypto VCs for Intmax's stateless ZK-Rollup protocol.",
  },
];

const AWARD_IMAGES = [
  { img: '/portfolio/images/award1.jpg', badge: '1ST PLACE', name: 'Solana/Wormhole', org: 'Solana Foundation' },
  { img: '/portfolio/images/award2.jpg', badge: '1ST PLACE', name: 'Impact Hub', org: 'Impact Hub Network' },
  { img: '/portfolio/images/award3.jpg', badge: '3RD PLACE', name: 'LaBitConf', org: 'LaBitConf 2022' },
  { img: '/portfolio/images/award4.jpg', badge: 'ETH GRANT', name: 'Ethereum Foundation', org: 'Ethereum Foundation' },
];

export default function Achievements() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.ach', {
        opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.achg', start: 'top 80%' },
      });
      gsap.to('.ach-proof', {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.ach-proof-grid', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" className="section" ref={sectionRef}>
      <div className="sc">// ACHIEVEMENTS_LOG</div>
      <div className="stag">AWARDS</div>
      <h2 className="stitle">Awards &amp; <em>Achievements</em></h2>

      <div className="achg">
        {ACHIEVEMENTS.map((a, i) => (
          <div key={i} className="ach">
            <span className="ai">{a.icon}</span>
            <div className="atitle">{a.title}</div>
            <div style={{ fontSize: '.65rem', color: 'var(--cyan)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.5rem', fontWeight: 700 }}>{a.subtitle}</div>
            <div className="adesc">{a.desc}</div>
          </div>
        ))}
      </div>

      <div className="ach-proof-label">// PROOF_OF_WORK</div>

      <div className="ach-proof-grid">
        {AWARD_IMAGES.map((a, i) => (
          <div key={i} className="ach-proof">
            <img src={a.img} alt={a.name} />
            <div className="ach-proof-overlay">
              <span className="ach-proof-badge">{a.badge}</span>
              <span className="ach-proof-name">{a.name}</span>
              <span className="ach-proof-org">{a.org}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
