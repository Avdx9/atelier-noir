'use client';
import { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animId;
    let cleanFn;

    const init = async () => {
      const THREE = await import('three');
      const canvas = canvasRef.current;
      if (!canvas) return;

      /* ── Scene ──────────────────────────────── */
      const scene = new THREE.Scene();
      const W = window.innerWidth, H = window.innerHeight;
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
      camera.position.set(0, 0.5, 6);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      /* ── Galaxy particles ────────────────────── */
      const COUNT = 7000;
      const positions = new Float32Array(COUNT * 3);
      const aColors  = new Float32Array(COUNT * 3);
      const aSizes   = new Float32Array(COUNT);

      for (let i = 0; i < COUNT; i++) {
        const i3  = i * 3;
        const arm = Math.floor(Math.random() * 3);
        const armAngle = (arm / 3) * Math.PI * 2;
        const radius = Math.pow(Math.random(), 0.55) * 5.5 + 0.1;
        const spin   = radius * 0.75 + armAngle;
        const spread = Math.pow(Math.random(), 3) * 0.55;
        const sAngle = Math.random() * Math.PI * 2;

        positions[i3]     = Math.cos(spin) * radius + Math.cos(sAngle) * spread;
        positions[i3 + 1] = (Math.random() - 0.5) * (0.25 + radius * 0.04);
        positions[i3 + 2] = Math.sin(spin) * radius + Math.sin(sAngle) * spread;

        // Gold gradient — bright core fades to deep amber arms
        const t = Math.min(radius / 5.5, 1);
        aColors[i3]     = 0.95 - t * 0.22;   // R
        aColors[i3 + 1] = 0.68 - t * 0.28;   // G
        aColors[i3 + 2] = 0.22 - t * 0.18;   // B

        aSizes[i] = (1 - t * 0.6) * 3.0 + Math.random() * 1.8 + 0.4;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('aColor',   new THREE.BufferAttribute(aColors,   3));
      geo.setAttribute('aSize',    new THREE.BufferAttribute(aSizes,    1));

      const mat = new THREE.ShaderMaterial({
        blending:  THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        vertexShader: /* glsl */ `
          attribute vec3  aColor;
          attribute float aSize;
          varying   vec3  vColor;
          void main() {
            vColor = aColor;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * (320.0 / -mv.z);
            gl_Position  = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vColor;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            float a = 1.0 - smoothstep(0.05, 0.5, d);
            a = pow(a, 1.8) * 0.88;
            gl_FragColor = vec4(vColor, a);
          }
        `,
      });

      const galaxy = new THREE.Points(geo, mat);
      scene.add(galaxy);

      /* ── Foreground sparkles ─────────────────── */
      const SP = 300;
      const spPos = new Float32Array(SP * 3);
      for (let i = 0; i < SP; i++) {
        const i3 = i * 3;
        spPos[i3]     = (Math.random() - 0.5) * 10;
        spPos[i3 + 1] = (Math.random() - 0.5) * 6;
        spPos[i3 + 2] = Math.random() * 2.5 + 2.8;
      }
      const spGeo = new THREE.BufferGeometry();
      spGeo.setAttribute('position', new THREE.BufferAttribute(spPos, 3));
      const spMat = new THREE.PointsMaterial({
        color: 0xE8C97D, size: 0.018,
        blending: THREE.AdditiveBlending,
        depthWrite: false, transparent: true, opacity: 0.55,
      });
      const sparks = new THREE.Points(spGeo, spMat);
      scene.add(sparks);

      /* ── Mouse / scroll state ─────────────────── */
      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      let   scrollY = 0;

      const onMouse = (e) => {
        mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 0.35;
        mouse.ty = (e.clientY / window.innerHeight - 0.5) * 0.22;
      };
      const onScroll = () => { scrollY = window.scrollY; };
      const onResize = () => {
        const W2 = window.innerWidth, H2 = window.innerHeight;
        camera.aspect = W2 / H2;
        camera.updateProjectionMatrix();
        renderer.setSize(W2, H2);
      };

      window.addEventListener('mousemove', onMouse);
      window.addEventListener('scroll',    onScroll,  { passive: true });
      window.addEventListener('resize',    onResize);

      /* ── Render loop ──────────────────────────── */
      const clock = new THREE.Clock();

      const tick = () => {
        const t = clock.getElapsedTime();

        mouse.x += (mouse.tx - mouse.x) * 0.045;
        mouse.y += (mouse.ty - mouse.y) * 0.045;

        galaxy.rotation.y = t * 0.038;
        galaxy.rotation.x = Math.sin(t * 0.012) * 0.07 + mouse.y * 0.28;
        galaxy.rotation.z = mouse.x * 0.18;

        sparks.rotation.y = t * 0.018;
        sparks.position.y = Math.sin(t * 0.35) * 0.06;

        // Smooth scroll camera zoom
        const targetZ = 6 + scrollY * 0.0025;
        camera.position.z += (targetZ - camera.position.z) * 0.04;
        camera.position.y += (0.5 - scrollY * 0.0004 - camera.position.y) * 0.04;

        renderer.render(scene, camera);
        animId = requestAnimationFrame(tick);
      };

      tick();

      cleanFn = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('scroll',    onScroll);
        window.removeEventListener('resize',    onResize);
        geo.dispose(); mat.dispose();
        spGeo.dispose(); spMat.dispose();
        renderer.dispose();
      };
    };

    init();
    return () => { if (cleanFn) cleanFn(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}
