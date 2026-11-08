'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FLOORS = 12;
const FLOOR_H = 0.62;
const EMBER = 0xd9a44a;
const BONE = 0xece8e1;

/**
 * A blueprint tower that assembles floor by floor as the hero scrolls.
 * Performance: shared geometries/materials, unlit materials, no shadows, DPR ≤ 1.5,
 * renders only while visible, full disposal on unmount.
 */
export default function ArchitecturalHeroCanvas({ triggerId, onReady }: { triggerId: string; onReady?: () => void }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ---------- Renderer ----------
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return; // no WebGL: poster stays visible
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x09090a, 14, 34);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    const target = new THREE.Vector3(0, FLOORS * FLOOR_H * 0.45, 0);

    // ---------- Shared resources ----------
    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(r: T) => (disposables.push(r), r);

    const slabBox = track(new THREE.BoxGeometry(3.2, 0.08, 2.4));
    const slabEdges = track(new THREE.EdgesGeometry(slabBox));
    const volumeBox = track(new THREE.BoxGeometry(3.0, FLOOR_H - 0.08, 2.2));
    const volumeEdges = track(new THREE.EdgesGeometry(volumeBox));
    const columnGeo = track(new THREE.BoxGeometry(0.06, FLOOR_H, 0.06));

    const emberLine = track(new THREE.LineBasicMaterial({ color: EMBER, transparent: true, opacity: 0.95 }));
    const boneLine = track(new THREE.LineBasicMaterial({ color: BONE, transparent: true, opacity: 0.22 }));
    const glass = track(
      new THREE.MeshBasicMaterial({ color: EMBER, transparent: true, opacity: 0.02, depthWrite: false, side: THREE.DoubleSide })
    );
    const columnMat = track(new THREE.MeshBasicMaterial({ color: BONE, transparent: true, opacity: 0.55 }));

    // ---------- Tower ----------
    const tower = new THREE.Group();
    scene.add(tower);

    const floors: { group: THREE.Group; baseY: number }[] = [];
    for (let i = 0; i < FLOORS; i++) {
      const group = new THREE.Group();
      const baseY = i * FLOOR_H;
      // gentle taper + alternating cantilever for an architectural silhouette
      const taper = 1 - i * 0.018;
      group.scale.set(taper, 1, taper);
      group.position.x = i % 4 === 3 ? 0.35 : 0;

      const slab = new THREE.LineSegments(slabEdges, emberLine);
      const volume = new THREE.LineSegments(volumeEdges, boneLine);
      volume.position.y = FLOOR_H / 2;
      const fill = new THREE.Mesh(volumeBox, glass);
      fill.position.y = FLOOR_H / 2;
      group.add(slab, volume, fill);
      tower.add(group);
      floors.push({ group, baseY });
    }

    // Columns as a single instanced mesh (4 per floor)
    const columns = new THREE.InstancedMesh(columnGeo, columnMat, FLOORS * 4);
    track(columns);
    tower.add(columns);
    const m4 = new THREE.Matrix4();
    const corners = [
      [-1.45, -1.05],
      [1.45, -1.05],
      [-1.45, 1.05],
      [1.45, 1.05],
    ];

    // Ground blueprint grid
    const grid = new THREE.GridHelper(40, 40, EMBER, BONE);
    const gridMat = grid.material as THREE.Material;
    gridMat.transparent = true;
    gridMat.opacity = 0.08;
    track(grid.geometry);
    track(gridMat);
    grid.position.y = -0.02;
    scene.add(grid);

    // Floating dust
    const dustCount = 240;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 18;
      dustPos[i * 3 + 1] = Math.random() * 10;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    const dustGeo = track(new THREE.BufferGeometry());
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = track(
      new THREE.PointsMaterial({ color: EMBER, size: 0.035, transparent: true, opacity: 0.6, depthWrite: false })
    );
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // ---------- State ----------
    const state = { build: 0, scroll: 0, mx: 0, my: 0, angle: -0.6 };
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const applyBuild = () => {
      const p = Math.min(1, state.build + state.scroll * 0.75);
      const progress = p * FLOORS;
      for (let i = 0; i < FLOORS; i++) {
        const t = Math.min(1, Math.max(0, progress - i));
        const e = ease(t);
        const { group, baseY } = floors[i];
        group.visible = t > 0;
        group.position.y = baseY + (1 - e) * 2.2;
        for (let c = 0; c < 4; c++) {
          const [x, z] = corners[c];
          const s = group.scale.x;
          m4.makeScale(1, Math.max(0.001, e), 1);
          m4.setPosition(x * s + group.position.x, group.position.y + (FLOOR_H * e) / 2, z * s);
          columns.setMatrixAt(i * 4 + c, m4);
        }
      }
      columns.instanceMatrix.needsUpdate = true;
      glass.opacity = 0.015 + 0.11 * Math.max(0, p - 0.35);
      boneLine.opacity = 0.18 + 0.2 * p;
    };

    // Intro auto-build, then scroll continues it
    const intro = gsap.to(state, { build: 0.55, duration: 2.6, ease: 'power2.inOut', delay: 0.3 });
    const st = ScrollTrigger.create({
      trigger: `#${triggerId}`,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        state.scroll = self.progress;
      },
    });

    // ---------- Resize ----------
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    // ---------- Pointer parallax ----------
    const onPointer = (e: PointerEvent) => {
      state.mx = (e.clientX / window.innerWidth - 0.5) * 2;
      state.my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    // ---------- Loop (only while visible) ----------
    let running = false;
    let inView = true;
    let raf = 0;
    let last = performance.now();
    let firstFrame = true;
    const cam = { x: 0, y: 0 };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      state.angle += dt * 0.06;
      cam.x += (state.mx * 0.5 - cam.x) * 0.04;
      cam.y += (state.my * 0.4 - cam.y) * 0.04;

      const radius = 15 - state.scroll * 2.5;
      camera.position.set(
        Math.sin(state.angle + cam.x * 0.3) * radius,
        5.2 + cam.y * -1.2 + state.scroll * 2,
        Math.cos(state.angle + cam.x * 0.3) * radius
      );
      camera.lookAt(target);
      dust.rotation.y += dt * 0.02;

      applyBuild();
      renderer.render(scene, camera);
      if (firstFrame) {
        firstFrame = false;
        onReady?.();
      }
    };

    const start = () => {
      if (running || !inView || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        inView ? start() : stop();
      },
      { threshold: 0 }
    );
    io.observe(mount);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    start();

    // ---------- Cleanup ----------
    return () => {
      stop();
      intro.kill();
      st.kill();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [triggerId, onReady]);

  return <div ref={mountRef} className="absolute inset-0" />;
}
