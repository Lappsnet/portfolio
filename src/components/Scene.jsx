import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.035);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Lights
    const lights = [
      { color: 0xff00ff, intensity: 3, pos: [-3, 2, 2] },
      { color: 0x00ffff, intensity: 3, pos: [3, -2, 1] },
      { color: 0x9900ff, intensity: 2, pos: [0, 3, -2] },
    ];
    const pointLights = lights.map(({ color, intensity, pos }) => {
      const l = new THREE.PointLight(color, intensity, 20);
      l.position.set(...pos);
      scene.add(l);
      return l;
    });

    // Grid planes
    const gridMats = [
      new THREE.MeshBasicMaterial({ color: 0xff00aa, wireframe: true, transparent: true, opacity: 0.15 }),
      new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true, transparent: true, opacity: 0.1 }),
    ];
    const gridGeos = [
      new THREE.PlaneGeometry(30, 30, 20, 20),
      new THREE.PlaneGeometry(30, 30, 15, 15),
    ];
    const grids = gridGeos.map((geo, i) => {
      const m = new THREE.Mesh(geo, gridMats[i]);
      m.rotation.x = -Math.PI / 2;
      m.position.y = -3;
      m.position.z = i === 0 ? 0 : -5;
      scene.add(m);
      return m;
    });

    // Torus rings
    const torusGeo = new THREE.TorusGeometry(2, 0.02, 8, 60);
    const torusMats = [
      new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x9900ff, wireframe: true }),
    ];
    const toruses = torusMats.map((mat, i) => {
      const t = new THREE.Mesh(torusGeo, mat);
      t.position.set(i === 0 ? -4 : i === 1 ? 4 : 0, i === 2 ? 3 : 0, -5);
      t.scale.set(1 + i * 0.3, 1 + i * 0.3, 1);
      scene.add(t);
      return t;
    });

    // Floating boxes
    const boxGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const boxMats = [
      new THREE.MeshBasicMaterial({ color: 0xff00aa, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x9900ff, wireframe: true }),
    ];
    const boxes = Array.from({ length: 14 }, (_, i) => {
      const mat = boxMats[i % 3];
      const b = new THREE.Mesh(boxGeo, mat);
      b.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 10 - 3);
      b.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(b);
      return b;
    });

    // Particle system
    const pCount = 1500;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(pCount * 3);
    const colors = new Float32Array(pCount * 3);
    const pColors = [
      [1, 0, 1], [0, 1, 1], [0.6, 0, 1], [0.5, 1, 0],
    ];
    for (let i = 0; i < pCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      const c = pColors[Math.floor(Math.random() * pColors.length)];
      colors[i * 3] = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.7 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Vertical lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.3 });
    const lineObjs = Array.from({ length: 8 }, (_, i) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3((i - 4) * 2, -8, -8),
        new THREE.Vector3((i - 4) * 2, 8, -8),
      ]);
      const line = new THREE.LineSegments(geo, lineMat);
      scene.add(line);
      return line;
    });

    // Mouse parallax
    let targetMX = 0, targetMY = 0;
    let camMX = 0, camMY = 0;
    function onMouseMove(e) {
      targetMX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      targetMY = -(e.clientY / window.innerHeight - 0.5) * 1.0;
    }
    window.addEventListener('mousemove', onMouseMove);

    // Grid animation state
    let grid0Z = 0;
    let grid1Z = -5;

    // Init _cs
    if (!window._cs) window._cs = { z: 5, y: 0, rx: 0 };

    // Resize
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);

    // Animation loop
    let raf;
    let t = 0;
    function animate() {
      raf = requestAnimationFrame(animate);
      t += 0.008;

      // Pulse lights
      pointLights.forEach((l, i) => {
        l.intensity = 2.5 + Math.sin(t * 1.5 + i * 2.1) * 1.0;
      });

      // Rotate toruses
      toruses.forEach((tor, i) => {
        tor.rotation.x += 0.003 + i * 0.001;
        tor.rotation.y += 0.005 + i * 0.002;
      });

      // Float boxes
      boxes.forEach((b, i) => {
        b.rotation.x += 0.005 + i * 0.0005;
        b.rotation.y += 0.007 + i * 0.0003;
        b.position.y += Math.sin(t + i) * 0.002;
      });

      // Particles drift
      particles.rotation.y += 0.0003;

      // Grid move toward camera (tunnel loop)
      grid0Z += 0.04;
      grid1Z += 0.04;
      if (grid0Z > 15) grid0Z = -5;
      if (grid1Z > 15) grid1Z = -5;
      grids[0].position.z = grid0Z;
      grids[1].position.z = grid1Z;

      // Camera smooth follow mouse
      camMX += (targetMX - camMX) * 0.04;
      camMY += (targetMY - camMY) * 0.04;
      camera.position.x = camMX;
      camera.position.y = (window._cs?.y || 0) + camMY;
      camera.position.z = window._cs?.z ?? 5;
      camera.rotation.x = window._cs?.rx || 0;

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      gridGeos.forEach((g) => g.dispose());
      gridMats.forEach((m) => m.dispose());
      torusGeo.dispose();
      torusMats.forEach((m) => m.dispose());
      boxGeo.dispose();
      boxMats.forEach((m) => m.dispose());
      pGeo.dispose();
      pMat.dispose();
      lineMat.dispose();
    };
  }, []);

  return null;
}
