import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SITES = [
  {
    id: 'intmax',
    wide: true,
    gc: '#0a0020,#1a0050,#4c1d95',
    url: 'intmax.io',
    href: 'https://intmax.io',
    icon: '⬡',
    title: 'INTMAX',
    desc: 'Stateless ZK-Rollup protocol — lightest Ethereum L2 ever built. Led BD, raised $5M seed round, expanded global partnerships.',
    tags: ['ZK-Rollup', 'Ethereum L2', 'Privacy', 'DeFi'],
  },
  {
    id: 'bittasker',
    gc: '#1a0500,#3d1200,#92400e',
    url: 'bittasker.xyz',
    href: 'https://bittasker.xyz',
    icon: '₿',
    title: 'BITTASKER',
    desc: 'Bitcoin-native task marketplace powered by Lightning Network. Co-founded and built from zero.',
    tags: ['Bitcoin', 'Lightning', 'P2P'],
  },
  {
    id: 'dubuu',
    gc: '#001a00,#003d00,#065f46',
    url: 'dubuu.com',
    href: 'https://dubuu.com',
    icon: '◈',
    title: 'DUBUU',
    desc: 'Web3 gaming platform bridging traditional gaming with blockchain ownership and tokenized assets.',
    tags: ['Gaming', 'NFT', 'Web3'],
  },
  {
    id: 'xfy',
    wide: true,
    gc: '#000d1a,#001a3d,#1e3a8a',
    url: 'lappsnet.com',
    href: 'https://lappsnet.com',
    icon: '⬢',
    title: 'XFY LAPPSNET',
    desc: 'Cross-chain DeFi protocol and Ethereum Foundation grant recipient. Pioneering RWA tokenization in Central America.',
    tags: ['Cross-Chain', 'RWA', 'DeFi', 'ETH Grant'],
  },
  {
    id: 'dmoney',
    gc: '#001a1a,#003d3d,#0f766e',
    url: 'd-money.xyz',
    href: 'https://d-money.xyz',
    icon: '$',
    title: 'XFY D-MONEY',
    desc: 'Decentralized money protocol enabling permissionless financial access across Latin America.',
    tags: ['DeFi', 'Stablecoin', 'LatAm'],
  },
  {
    id: 'macro',
    gc: '#0d001a,#1a0050,#6d28d9',
    url: 'macroblockshop.com',
    href: 'https://macroblockshop.com',
    icon: '◻',
    title: 'MACROBLOCK SHOP',
    desc: 'NFT marketplace and digital collectibles platform for blockchain-native creators and collectors.',
    tags: ['NFT', 'Marketplace', 'Web3'],
  },
  {
    id: 'kallii',
    gc: '#00001a,#00003d,#1e3a8a',
    url: 'kallii.io',
    href: 'https://kallii.io',
    icon: '◎',
    title: 'KALLII',
    desc: 'Social token platform connecting creators with communities through tokenized engagement.',
    tags: ['Social', 'Token', 'Creator'],
  },
];

export default function LiveSites() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.bento-card', {
        opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
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
        gsap.to(card, { rotationY: dx * 8, rotationX: -dy * 8, duration: 0.3, ease: 'power2.out', transformPerspective: 800 });
      }
      function onLeave() {
        gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.5, ease: 'power2.out' });
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
    <section id="live" className="section" ref={sectionRef}>
      <div className="sc">// DEPLOYED_PRODUCTS</div>
      <div className="stag">LIVE SITES</div>
      <h2 className="stitle">Websites I&apos;ve <em>Shipped</em></h2>

      <div className="bento">
        {SITES.map((site, i) => (
          <div
            key={site.id}
            className={`bento-card${site.wide ? ' bento-wide' : ''}`}
            style={{ '--gc': site.gc }}
            ref={(el) => (cardRefs.current[i] = el)}
            onClick={() => window.open(site.href, '_blank')}
            role="link"
            tabIndex={0}
          >
            <div className="bento-browser">
              <div className="bento-dots">
                <i /><i /><i />
              </div>
              <span className="bento-url">{site.url}</span>
              <span className="bento-live">LIVE</span>
            </div>
            <div className="bento-body">
              <div className="bento-icon">{site.icon}</div>
              <h3 className="bento-title">{site.title}</h3>
              <p className="bento-desc">{site.desc}</p>
              <div className="bento-tags">
                {site.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
            <div className="bento-arrow">→</div>
          </div>
        ))}
      </div>
    </section>
  );
}
