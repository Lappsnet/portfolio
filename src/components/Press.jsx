import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ARTICLES = [
  {
    pub: 'CoinTelegraph ES',
    date: 'NOV 2023',
    cat: 'ZK-ROLLUP',
    title: 'Intmax: El Layer 2 más ligero de Ethereum llega a Latinoamérica',
    excerpt: 'Jonathan Cruz, Head of BD en Ryodan Systems, explica cómo Intmax redefine la privacidad en Ethereum con zero-knowledge proofs y su expansión en la región.',
    href: 'https://es.cointelegraph.com',
  },
  {
    pub: 'Diario El Salvador',
    date: 'MAR 2025',
    cat: 'BITCOIN',
    title: 'BitTasker: El marketplace de tareas que paga en Bitcoin llega a El Salvador',
    excerpt: 'La plataforma co-fundada por Jonathan Cruz permite contratar servicios y recibir pagos instantáneos a través de Lightning Network sin necesidad de banco.',
    href: 'https://diarioelsalvador.com',
  },
  {
    pub: 'TradingView / CoinTelegraph',
    date: 'SEP 2023',
    cat: 'ANÁLISIS',
    title: 'ZK-Rollups and the Future of Ethereum Scalability: A Deep Dive',
    excerpt: 'Featuring insights from Jonathan Cruz on how stateless ZK-Rollup architecture positions Intmax as the most efficient Layer 2 solution for institutional DeFi.',
    href: 'https://www.tradingview.com',
  },
  {
    pub: 'Diario El Salvador',
    date: 'JUL 2023',
    cat: 'BLOCKCHAIN',
    title: 'Ryodan Systems e Intmax: La startup salvadoreña que levantó $5M en Web3',
    excerpt: 'La ronda seed liderada por Jonathan Cruz posiciona a El Salvador en el mapa global de la innovación blockchain con un protocolo de privacidad de próxima generación.',
    href: 'https://diarioelsalvador.com',
  },
  {
    pub: 'Diario El Salvador',
    date: 'DEC 2022',
    cat: 'HACKATHON',
    title: 'Desarrolladores salvadoreños ganan hackathon en LaBitConf con proyecto DeFi',
    excerpt: 'El equipo de Lappsnet, liderado por Jonathan Cruz, se alzó con el tercer lugar en el hackathon de LaBitConf presentando infraestructura cross-chain para RWA tokenization.',
    href: 'https://diarioelsalvador.com',
  },
];

export default function Press() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.press-card', {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="press" className="section" ref={sectionRef}>
      <div className="sc">// MEDIA_ARCHIVE</div>
      <div className="stag">PRESS</div>
      <h2 className="stitle">Featured in <em>The Media</em></h2>

      <div className="press-grid">
        {ARTICLES.map((a, i) => (
          <div key={i} className="press-card">
            <div className="press-top">
              <span className="press-pub">{a.pub}</span>
              <span className="press-date">{a.date}</span>
            </div>
            <span className="press-cat">{a.cat}</span>
            <h3 className="press-title">{a.title}</h3>
            <p className="press-excerpt">{a.excerpt}</p>
            <a href={a.href} target="_blank" rel="noreferrer" className="press-link">
              READ ARTICLE →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
