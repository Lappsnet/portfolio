import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SKILLS = [
  { name: 'ZK-Rollup / Layer 2', desc: 'Stateless proofs, zkEVM, Plonky2' },
  { name: 'DeFi Protocols', desc: 'AMMs, lending, yield strategies' },
  { name: 'Lightning Network', desc: 'LNURL, micropayments, routing' },
  { name: 'RWA Tokenization', desc: 'On-chain real-world assets' },
  { name: 'Institutional BD', desc: 'VC relations, partnerships' },
  { name: 'Cross-Chain / Bridges', desc: 'Wormhole, interoperability' },
  { name: 'Smart Contracts', desc: 'Solidity, Foundry, Hardhat' },
  { name: 'Token Launch / TGE', desc: 'Tokenomics, IDO, listings' },
  { name: 'CRM & Pipeline', desc: 'HubSpot, deal management' },
  { name: 'Conference BD', desc: 'ETHGlobal, Token2049, Consensus' },
  { name: 'Go-to-Market', desc: 'GTM strategy, growth loops' },
  { name: 'Solana Ecosystem', desc: 'SPL tokens, programs, DeFi' },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.stag', {
        opacity: 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.to('.stitle', {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.to('.at', {
        opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.ag', start: 'top 80%' },
      });
      gsap.to('.sk', {
        opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.ag', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="sc">// OPERATIVE_PROFILE</div>
      <div className="stag">ABOUT</div>
      <h2 className="stitle">
        Blockchain Specialist &amp; <em>Growth Builder</em>
      </h2>

      <div className="ag">
        <div className="at">
          <p>
            Based in <strong>San Salvador, El Salvador</strong> — the first country to adopt Bitcoin as legal tender — Jonathan Cruz has spent 5+ years at the intersection of blockchain innovation and institutional growth strategy. He operates where cutting-edge cryptography meets real-world business development.
          </p>
          <p>
            As Head of BD at <strong>Ryodan Systems (Intmax)</strong>, Jonathan spearheaded a <strong>$5M seed round</strong> and established strategic partnerships across the ZK-Rollup and Layer 2 space. His expertise spans zero-knowledge proofs, DeFi protocol design, RWA tokenization, and cross-chain bridge architecture — built through hands-on product development and global conference presence.
          </p>
          <p>
            Co-founder of <strong>BitTasker</strong> — a Bitcoin-native task marketplace leveraging the Lightning Network — and founder of <strong>Lappsnet</strong>, an Ethereum grant recipient. Jonathan has won multiple international hackathons (Solana/Wormhole, Impact Hub, LaBitConf) and has been featured in CoinTelegraph, Diario El Salvador, and TradingView.
          </p>
        </div>

        <div className="sk">
          {SKILLS.map((s) => (
            <div key={s.name} className="si">
              <div className="sn2">{s.name}</div>
              <div className="sd">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
