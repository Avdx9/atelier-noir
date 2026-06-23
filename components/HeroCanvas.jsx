'use client';
import { useEffect, useRef } from 'react';
export default function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    let animId, cleanFn;
    const init = async () => {
      const THREE = await import('three');
      const canvas = ref.current; if (!canvas) return;
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
      camera.position.set(0, 0, 7);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const COUNT = 6000;
      const pos = new Float32Array(COUNT * 3);
      const col = new Float32Array(COUNT * 3);
      const sz  = new Float32Array(COUNT);
      const off = new Float32Array(COUNT);

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        const r = 1.6 + Math.random() * 3.4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        pos[i3]     = r * Math.sin(phi) * Math.cos(theta);
        pos[i3 + 1] = r * Math.cos(phi) * 0.55;
        pos[i3 + 2] = r * Math.sin(phi) * Math.sin(theta);
        off[i] = Math.random() * Math.PI * 2;
        const p = Math.random();
        if (p < 0.5) {
          // warm gold — dimmer
          col[i3] = 0.65 + Math.random() * 0.1;
          col[i3+1] = 0.52 + Math.random() * 0.1;
          col[i3+2] = 0.18 + Math.random() * 0.08;
          sz[i] = Math.random() * 1.5 + 0.4;
        } else if (p < 0.8) {
          // pale cream
          col[i3] = 0.82 + Math.random() * 0.1;
          col[i3+1] = 0.74 + Math.random() * 0.1;
          col[i3+2] = 0.52 + Math.random() * 0.1;
          sz[i] = Math.random() * 1.0 + 0.3;
        } else {
          // bright gold accent — fewer, smaller
          col[i3] = 0.85 + Math.random() * 0.08;
          col[i3+1] = 0.65 + Math.random() * 0.08;
          col[i3+2] = 0.28 + Math.random() * 0.06;
          sz[i] = Math.random() * 1.8 + 0.8;
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('aColor',   new THREE.BufferAttribute(col, 3));
      geo.setAttribute('aSize',    new THREE.BufferAttribute(sz, 1));
      geo.setAttribute('aOffset',  new THREE.BufferAttribute(off, 1));

      const mat = new THREE.ShaderMaterial({
        blending: THREE.AdditiveBlending,
        depthWrite: false, transparent: true,
        uniforms: { uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0, 0) } },
        vertexShader: `
          uniform float uTime; uniform vec2 uMouse;
          attribute vec3 aColor; attribute float aSize, aOffset;
          varying vec3 vColor; varying float vAlpha;
          void main(){
            vColor = aColor;
            vec3 p = position;
            float breath = 1.0 + sin(uTime * 0.3 + aOffset) * 0.04;
            p *= breath;
            p.x += sin(uTime * 0.22 + aOffset * 2.0) * 0.12 + uMouse.x * length(p) * 0.08;
            p.y += cos(uTime * 0.18 + aOffset * 1.7) * 0.09 + uMouse.y * length(p) * 0.07;
            p.z += sin(uTime * 0.15 + aOffset * 2.3) * 0.08;
            float pulse = 1.0 + sin(uTime * 3.5 + aOffset * 5.0) * 0.12;
            vec3 tp = (modelMatrix * vec4(p, 1.0)).xyz;
            vAlpha = clamp((tp.z + 5.0) / 10.0, 0.08, 0.75) * 0.82;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = aSize * pulse * (280.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: `
          varying vec3 vColor; varying float vAlpha;
          void main(){
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            float a = 1.0 - smoothstep(0.1, 0.5, d);
            a = pow(a, 1.8) * vAlpha;
            gl_FragColor = vec4(vColor, a);
          }`
      });

      const stars = new THREE.Points(geo, mat);
      scene.add(stars);

      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      const onM = e => {
        mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 0.5;
        mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 0.35;
      };
      const onR = () => {
        const W2 = canvas.offsetWidth, H2 = canvas.offsetHeight;
        camera.aspect = W2 / H2;
        camera.updateProjectionMatrix();
        renderer.setSize(W2, H2);
      };
      window.addEventListener('mousemove', onM);
      window.addEventListener('resize', onR);

      const clock = new THREE.Clock();
      const tick = () => {
        const t = clock.getElapsedTime();
        mouse.x += (mouse.tx - mouse.x) * 0.035;
        mouse.y += (mouse.ty - mouse.y) * 0.035;
        stars.rotation.y = t * 0.05;
        stars.rotation.x = mouse.y * 0.25 + Math.sin(t * 0.04) * 0.03;
        stars.rotation.z = mouse.x * 0.18;
        mat.uniforms.uTime.value = t;
        mat.uniforms.uMouse.value.set(mouse.x, mouse.y);
        renderer.render(scene, camera);
        animId = requestAnimationFrame(tick);
      };
      tick();

      cleanFn = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', onM);
        window.removeEventListener('resize', onR);
        geo.dispose(); mat.dispose(); renderer.dispose();
      };
    };
    init();
    return () => { if (cleanFn) cleanFn(); };
  }, []);

  return (
    <canvas ref={ref} style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0,
    }} />
  );
}
