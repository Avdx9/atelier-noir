'use client';
import { useEffect, useRef } from 'react';
export default function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    let animId, cleanFn;
    const init = async () => {
      const THREE = await import('three');
      const canvas = ref.current; if (!canvas) return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
      camera.position.set(0,0,7);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const COUNT = 7000;
      const pos = new Float32Array(COUNT*3), col = new Float32Array(COUNT*3),
            sz  = new Float32Array(COUNT),   off = new Float32Array(COUNT);

      for (let i = 0; i < COUNT; i++) {
        const i3 = i*3;
        const r = 1.8 + Math.random()*3.2, theta = Math.random()*Math.PI*2, phi = Math.acos(2*Math.random()-1);
        pos[i3]   = r*Math.sin(phi)*Math.cos(theta); pos[i3+1] = r*Math.cos(phi)*0.6; pos[i3+2] = r*Math.sin(phi)*Math.sin(theta);
        off[i] = Math.random()*Math.PI*2;
        const p = Math.random();
        if (p < 0.55) { col[i3]=0.788; col[i3+1]=0.659; col[i3+2]=0.298; sz[i]=Math.random()*2+0.5; }
        else if (p < 0.8) { col[i3]=0.957; col[i3+1]=0.894; col[i3+2]=0.729; sz[i]=Math.random()*1.4+0.3; }
        else { col[i3]=0.949; col[i3+1]=0.737; col[i3+2]=0.388; sz[i]=Math.random()*3+1.5; }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
      geo.setAttribute('aColor',   new THREE.BufferAttribute(col,3));
      geo.setAttribute('aSize',    new THREE.BufferAttribute(sz,1));
      geo.setAttribute('aOffset',  new THREE.BufferAttribute(off,1));

      const mat = new THREE.ShaderMaterial({
        blending:THREE.AdditiveBlending, depthWrite:false, transparent:true,
        uniforms:{ uTime:{value:0}, uMouse:{value:new THREE.Vector2(0,0)} },
        vertexShader:`uniform float uTime;uniform vec2 uMouse;attribute vec3 aColor;attribute float aSize,aOffset;varying vec3 vColor;varying float vAlpha;
          void main(){vColor=aColor;vec3 p=position;
          float breath=1.0+sin(uTime*0.35+aOffset)*0.045;p*=breath;
          p.x+=sin(uTime*0.25+aOffset*2.0)*0.14+uMouse.x*length(p)*0.12;
          p.y+=cos(uTime*0.2+aOffset*1.7)*0.1+uMouse.y*length(p)*0.1;
          p.z+=sin(uTime*0.18+aOffset*2.3)*0.1;
          float pulse=1.0+sin(uTime*4.0+aOffset*5.0)*0.15;
          vec3 tp=(modelMatrix*vec4(p,1.0)).xyz;
          vAlpha=clamp((tp.z+5.0)/10.0,0.1,1.0)*0.88;
          vec4 mv=modelViewMatrix*vec4(p,1.0);
          gl_PointSize=aSize*pulse*(300.0/-mv.z);gl_Position=projectionMatrix*mv;}`,
        fragmentShader:`varying vec3 vColor;varying float vAlpha;
          void main(){float d=distance(gl_PointCoord,vec2(0.5));if(d>0.5)discard;
          float a=1.0-smoothstep(0.05,0.5,d);a=pow(a,1.5)*vAlpha;
          float core=1.0-smoothstep(0.0,0.1,d);
          gl_FragColor=vec4(vColor+core*0.3,a);}`
      });

      const stars = new THREE.Points(geo, mat);
      scene.add(stars);
      const mouse = {x:0,y:0,tx:0,ty:0};
      const onM = e => { mouse.tx=(e.clientX/window.innerWidth-0.5)*0.55; mouse.ty=-(e.clientY/window.innerHeight-0.5)*0.4; };
      const onR = () => { camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth,window.innerHeight); };
      window.addEventListener('mousemove',onM); window.addEventListener('resize',onR);
      const clock = new THREE.Clock();
      const tick = () => {
        const t = clock.getElapsedTime();
        mouse.x+=(mouse.tx-mouse.x)*0.035; mouse.y+=(mouse.ty-mouse.y)*0.035;
        stars.rotation.y=t*0.055; stars.rotation.x=mouse.y*0.3+Math.sin(t*0.04)*0.04; stars.rotation.z=mouse.x*0.2;
        mat.uniforms.uTime.value=t; mat.uniforms.uMouse.value.set(mouse.x,mouse.y);
        renderer.render(scene,camera); animId=requestAnimationFrame(tick);
      };
      tick();
      cleanFn=()=>{ cancelAnimationFrame(animId); window.removeEventListener('mousemove',onM); window.removeEventListener('resize',onR); geo.dispose(); mat.dispose(); renderer.dispose(); };
    };
    init();
    return ()=>{ if(cleanFn) cleanFn(); };
  }, []);
  return <canvas ref={ref} style={{ position:'fixed',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0 }} />;
}
