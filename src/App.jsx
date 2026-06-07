import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Scene from './components/Scene';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import LiveSites from './components/LiveSites';
import Projects from './components/Projects';
import Press from './components/Press';
import TechRadar from './components/TechRadar';
import Videos from './components/Videos';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [booted, setBooted] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [heroAnimate, setHeroAnimate] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  function handleBootComplete() {
    document.body.style.overflow = '';
    setBooted(true);
    setNavVisible(true);
    setHeroAnimate(true);
  }

  useEffect(() => {
    if (!booted) return;

    const bar = document.getElementById('progress-bar');
    if (bar) {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          bar.style.transform = `scaleX(${self.progress})`;
        },
      });
    }

    window._cs = { z: 5, y: 0, rx: 0 };
    const sections = ['#about', '#live', '#projects', '#press', '#radar', '#videos', '#experience', '#achievements', '#contact'];
    const zVals = [3, 2, 1.5, 1, 0.5, 0, -0.5, -1, -1.5];
    sections.forEach((sel, i) => {
      const el = document.querySelector(sel);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        onEnter: () => gsap.to(window._cs, { z: zVals[i], duration: 1.5, ease: 'power2.out' }),
        onLeaveBack: () => gsap.to(window._cs, { z: i > 0 ? zVals[i - 1] : 5, duration: 1.5, ease: 'power2.out' }),
      });
    });

    return () => ScrollTrigger.killAll();
  }, [booted]);

  return (
    <>
      <Preloader onComplete={handleBootComplete} />
      <Cursor />
      <Scene />

      <div id="scanlines" />
      <div id="vignette" />
      <div id="progress-bar" />

      <Nav visible={navVisible} />

      <main>
        <Hero animate={heroAnimate} />
        <Gallery />
        <About />
        <LiveSites />
        <Projects />
        <Press />
        <TechRadar />
        <Videos />
        <Experience />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
