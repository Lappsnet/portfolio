import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const JOBS = [
  {
    date: 'APR 2025 – PRESENT',
    company: 'BitTasker',
    role: 'Co-Founder & Head of Growth',
    bullets: [
      'Co-founded Bitcoin-native task marketplace powered by Lightning Network micropayments',
      'Led product strategy, go-to-market execution, and growth to 500+ users in 3 months',
      'Secured media coverage in Diario El Salvador and crypto-native publications',
      'Architected token economics and future TGE roadmap for platform sustainability',
    ],
  },
  {
    date: 'JAN 2021 – DEC 2024',
    company: 'Ryodan Systems / Intmax',
    role: 'Head of Business Development',
    bullets: [
      'Spearheaded $5M seed round from tier-1 crypto VCs and strategic investors',
      'Built and managed 30+ institutional partnerships across Asia, Europe, and the Americas',
      'Represented Intmax at ETHGlobal, Token2049, DevConnect, Consensus, and LaBitConf',
      'Drove protocol adoption: 50K+ testnet wallets, DeFi integrations, and cross-chain partnerships',
      'Established ZK-Rollup education and developer relations program reaching 10K+ developers',
    ],
  },
  {
    date: 'JAN 2020 – DEC 2021',
    company: 'Lappsnet',
    role: 'Founder & Protocol Architect',
    bullets: [
      'Founded cross-chain DeFi protocol and secured Ethereum Foundation grant',
      'Pioneered real-world asset (RWA) tokenization for property and SMBs in Central America',
      'Won Solana/Wormhole hackathon (1st place) and Impact Hub competition (1st place)',
      'Built cross-chain bridge architecture supporting EVM-compatible L1s and L2s',
      'Achieved 3rd place at LaBitConf hackathon with cross-chain DeFi infrastructure',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.ti', {
        opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section" ref={sectionRef}>
      <div className="sc">// CAREER_LOG</div>
      <div className="stag">EXPERIENCE</div>
      <h2 className="stitle">Professional <em>Experience</em></h2>

      <div className="tl">
        {JOBS.map((job, i) => (
          <div key={i} className="ti">
            <div className="td">{job.date}</div>
            <div className="tc">{job.company}</div>
            <div className="tr">{job.role}</div>
            <ul className="tlist">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
