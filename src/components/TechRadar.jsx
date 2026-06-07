import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CATEGORIES = [
  {
    name: 'ZK-Rollup & Layer 2',
    tags: [
      { label: 'Intmax Protocol', hot: true },
      { label: 'zkEVM' },
      { label: 'Polygon zkEVM', hot: true },
      { label: 'StarkNet' },
      { label: 'Stateless Rollups', hot: true },
      { label: 'ZK Proofs' },
      { label: 'Plonky2' },
    ],
  },
  {
    name: 'Bitcoin & Lightning',
    tags: [
      { label: 'Lightning Network', hot: true },
      { label: 'LNURL' },
      { label: 'BTCPay Server' },
      { label: 'Taproot' },
      { label: 'RGB Protocol' },
      { label: 'Nostr', hot: true },
      { label: 'Bitcoin Script' },
    ],
  },
  {
    name: 'DeFi & Smart Contracts',
    tags: [
      { label: 'Solidity', hot: true },
      { label: 'Hardhat' },
      { label: 'Foundry', hot: true },
      { label: 'Uniswap V3/V4' },
      { label: 'Aave' },
      { label: 'Chainlink' },
      { label: 'ERC-4626' },
    ],
  },
  {
    name: 'Ecosystems & Protocols',
    tags: [
      { label: 'Ethereum', hot: true },
      { label: 'Solana', hot: true },
      { label: 'Wormhole' },
      { label: 'Base' },
      { label: 'Arbitrum' },
      { label: 'Near Protocol' },
      { label: 'Rootstock (RSK)' },
    ],
  },
  {
    name: 'Institutional BD & GTM',
    tags: [
      { label: 'VC Fundraising', hot: true },
      { label: 'Partnership Dev' },
      { label: 'Token Economics', hot: true },
      { label: 'TGE Strategy' },
      { label: 'Conference BD' },
      { label: 'RWA Tokenization', hot: true },
      { label: 'Investor Relations' },
    ],
  },
  {
    name: 'Tools & Operations',
    tags: [
      { label: 'HubSpot CRM' },
      { label: 'Notion' },
      { label: 'Dune Analytics', hot: true },
      { label: 'Etherscan' },
      { label: 'The Graph' },
      { label: 'IPFS' },
      { label: 'Alchemy' },
    ],
  },
];

export default function TechRadar() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.rcat', {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="radar" className="section" ref={sectionRef}>
      <div className="sc">// TECH_STACK_RADAR</div>
      <div className="stag">TECH STACK</div>
      <h2 className="stitle">In-Demand <em>Tech Stack</em></h2>
      <p style={{ fontSize: '.85rem', color: '#8890a8', lineHeight: 1.8, maxWidth: 600, marginBottom: '1rem' }}>
        Five years at the bleeding edge of Web3 means mastering the full stack — from zero-knowledge cryptography to go-to-market execution. Here&apos;s the arsenal.
      </p>

      <div className="radar-grid">
        {CATEGORIES.map((cat) => (
          <div key={cat.name} className="rcat">
            <div className="rcat-label">{cat.name}</div>
            <div className="rtags">
              {cat.tags.map((t) => (
                <span key={t.label} className={`rt${t.hot ? ' hot' : ''}`}>
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
