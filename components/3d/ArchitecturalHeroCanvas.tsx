'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useLanguage } from '../ui/LanguageContext';
import { Box, Layers, Sparkles, Compass, Eye } from 'lucide-react';

export type ViewMode = 'wireframe' | 'structural' | 'facade';

export const ArchitecturalHeroCanvas: React.FC = () => {
  const { t, locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentMode, setCurrentMode] = useState<ViewMode>('wireframe');
  const [fps, setFps] = useState<number>(60);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const buildingGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<{
    wireframe: THREE.Material[];
    structural: THREE.Material[];
    facade: THREE.Material[];
  }>({ wireframe: [], structural: [], facade: [] });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x07080a, 0.028);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(12, 10, 16);
    camera.lookAt(0, 3, 0);

    // 3. Renderer with clamped pixel ratio
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 2.0);
    dirLight.position.set(15, 25, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const amberLight = new THREE.PointLight(0xdda13b, 3.5, 20);
    amberLight.position.set(-6, 8, -4);
    scene.add(amberLight);

    const cyanLight = new THREE.PointLight(0x4a6e93, 2.5, 25);
    cyanLight.position.set(6, -2, 8);
    scene.add(cyanLight);

    // 5. Blueprint Ground Grid
    const gridHelper = new THREE.GridHelper(40, 40, 0xdda13b, 0x1f2b38);
    gridHelper.position.y = -0.01;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.45;
    scene.add(gridHelper);

    // 6. Architectural Building Group
    const buildingGroup = new THREE.Group();
    buildingGroupRef.current = buildingGroup;
    scene.add(buildingGroup);

    // Store references for mode switching
    const wireframeMaterials: THREE.Material[] = [];
    const structuralMaterials: THREE.Material[] = [];
    const facadeMaterials: THREE.Material[] = [];

    // Create Architectural Tower Floors & Core
    const floorCount = 8;
    const floorHeight = 1.0;
    const buildingWidth = 5.0;
    const buildingDepth = 4.0;

    // Base podium / Foundation
    const podiumGeo = new THREE.BoxGeometry(7, 0.4, 6);
    const podiumMat = new THREE.MeshStandardMaterial({
      color: 0x121519,
      roughness: 0.8,
      metalness: 0.2,
    });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.y = 0.2;
    podium.receiveShadow = true;
    buildingGroup.add(podium);
    facadeMaterials.push(podiumMat);

    // Central Concrete Elevator Core
    const coreGeo = new THREE.BoxGeometry(1.6, floorCount * floorHeight + 1.2, 1.4);
    const coreWireMat = new THREE.MeshBasicMaterial({ color: 0x4a6e93, wireframe: true });
    const coreStructMat = new THREE.MeshStandardMaterial({ color: 0x3a424d, roughness: 0.9 });
    const coreFacadeMat = new THREE.MeshStandardMaterial({ color: 0x1a1d22, roughness: 0.6, metalness: 0.4 });
    const coreMesh = new THREE.Mesh(coreGeo, coreWireMat);
    coreMesh.position.y = (floorCount * floorHeight + 1.2) / 2;
    buildingGroup.add(coreMesh);
    wireframeMaterials.push(coreWireMat);
    structuralMaterials.push(coreStructMat);
    facadeMaterials.push(coreFacadeMat);

    // Floors, Slabs & Columns
    for (let i = 0; i < floorCount; i++) {
      const yPos = 0.4 + i * floorHeight + floorHeight / 2;
      const floorScale = 1 - (i * 0.035); // subtle modern taper

      // Floor Slab
      const slabGeo = new THREE.BoxGeometry(buildingWidth * floorScale, 0.12, buildingDepth * floorScale);
      const slabWire = new THREE.MeshBasicMaterial({ color: 0xdda13b, wireframe: true });
      const slabStruct = new THREE.MeshStandardMaterial({ color: 0x4e5560, roughness: 0.7 });
      const slabFacade = new THREE.MeshStandardMaterial({ color: 0x0f1114, roughness: 0.3, metalness: 0.8 });
      const slabMesh = new THREE.Mesh(slabGeo, slabWire);
      slabMesh.position.y = yPos;
      buildingGroup.add(slabMesh);
      wireframeMaterials.push(slabWire);
      structuralMaterials.push(slabStruct);
      facadeMaterials.push(slabFacade);

      // 4 Corner Structural Columns
      const colHeight = floorHeight - 0.12;
      const colGeo = new THREE.BoxGeometry(0.18, colHeight, 0.18);
      const colPositions = [
        [-(buildingWidth * floorScale) / 2 + 0.3, yPos + colHeight / 2, -(buildingDepth * floorScale) / 2 + 0.3],
        [(buildingWidth * floorScale) / 2 - 0.3, yPos + colHeight / 2, -(buildingDepth * floorScale) / 2 + 0.3],
        [-(buildingWidth * floorScale) / 2 + 0.3, yPos + colHeight / 2, (buildingDepth * floorScale) / 2 - 0.3],
        [(buildingWidth * floorScale) / 2 - 0.3, yPos + colHeight / 2, (buildingDepth * floorScale) / 2 - 0.3],
      ];

      colPositions.forEach(([cx, cy, cz]) => {
        const colWire = new THREE.MeshBasicMaterial({ color: 0x4a6e93, wireframe: true });
        const colStruct = new THREE.MeshStandardMaterial({ color: 0x8a909a, metalness: 0.6, roughness: 0.3 });
        const colFacade = new THREE.MeshStandardMaterial({ color: 0xdda13b, metalness: 0.9, roughness: 0.2 });
        const colMesh = new THREE.Mesh(colGeo, colWire);
        colMesh.position.set(cx, cy, cz);
        buildingGroup.add(colMesh);
        wireframeMaterials.push(colWire);
        structuralMaterials.push(colStruct);
        facadeMaterials.push(colFacade);
      });

      // Glass Curtain Wall Facade Envelope (For Facade mode)
      const glassGeo = new THREE.BoxGeometry(buildingWidth * floorScale - 0.05, colHeight, buildingDepth * floorScale - 0.05);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x112233,
        transparent: true,
        opacity: 0.45,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.6,
        ior: 1.5,
      });
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      glassMesh.position.y = yPos + colHeight / 2;
      glassMesh.visible = false;
      buildingGroup.add(glassMesh);
      facadeMaterials.push(glassMat);
    }

    // Cantilever Balcony / Sky Lounge at Floor 5
    const balconyGeo = new THREE.BoxGeometry(2.5, 0.15, 2.0);
    const balconyMat = new THREE.MeshStandardMaterial({ color: 0xdda13b, metalness: 0.8, roughness: 0.2 });
    const balcony = new THREE.Mesh(balconyGeo, balconyMat);
    balcony.position.set(2.4, 0.4 + 4 * floorHeight, 0);
    buildingGroup.add(balcony);
    facadeMaterials.push(balconyMat);

    // Floating Architectural Particle Grid
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 30;
      particlePositions[p + 1] = Math.random() * 15;
      particlePositions[p + 2] = (Math.random() - 0.5) * 30;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xdda13b,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    materialsRef.current = {
      wireframe: wireframeMaterials,
      structural: structuralMaterials,
      facade: facadeMaterials,
    };

    // 7. Mouse Parallax & Smooth Rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotationY = x * 0.45;
      targetRotationX = y * 0.2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = 0;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // FPS counter calculation
      frameCount++;
      if (time - fpsTimer > 1000) {
        setFps(Math.round((frameCount * 1000) / (time - fpsTimer)));
        frameCount = 0;
        fpsTimer = time;
      }

      // Continuous gentle rotation + mouse tilt
      if (buildingGroup) {
        buildingGroup.rotation.y += 0.003;
        buildingGroup.rotation.y += (targetRotationY - buildingGroup.rotation.y * 0.1) * 0.02;
        buildingGroup.rotation.x += (targetRotationX - buildingGroup.rotation.x) * 0.02;
      }

      // Subtle particle float
      if (particleSystem) {
        particleSystem.rotation.y += 0.0008;
      }

      renderer.render(scene, camera);
    };

    animate(performance.now());

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
      podiumGeo.dispose();
      coreGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  // Mode Switcher Handler
  const handleModeChange = (mode: ViewMode) => {
    setCurrentMode(mode);
    if (!buildingGroupRef.current) return;

    buildingGroupRef.current.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh) {
        if (mode === 'wireframe') {
          if (child.material instanceof THREE.MeshBasicMaterial) {
            child.material.wireframe = true;
            child.visible = true;
          } else if (child.material instanceof THREE.MeshPhysicalMaterial) {
            child.visible = false;
          }
        } else if (mode === 'structural') {
          if (child.material instanceof THREE.MeshBasicMaterial) {
            child.material.wireframe = false;
            child.visible = true;
          } else if (child.material instanceof THREE.MeshPhysicalMaterial) {
            child.visible = false;
          }
        } else if (mode === 'facade') {
          if (child.material instanceof THREE.MeshBasicMaterial) {
            child.material.wireframe = false;
          }
          child.visible = true;
        }
      }
    });
  };

  return (
    <div className="relative w-full h-[520px] md:h-[620px] lg:h-[700px] select-none">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Dynamic View Mode HUD Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 p-1.5 rounded-full bg-[#0d1014]/85 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/80">
        <button
          onClick={() => handleModeChange('wireframe')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            currentMode === 'wireframe'
              ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-lg shadow-amber-500/20'
              : 'text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>{t.hero.viewModes.blueprint}</span>
        </button>

        <button
          onClick={() => handleModeChange('structural')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            currentMode === 'structural'
              ? 'bg-gradient-to-r from-blueprint-light to-blueprint text-white shadow-lg shadow-blueprint/30'
              : 'text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{t.hero.viewModes.structural}</span>
        </button>

        <button
          onClick={() => handleModeChange('facade')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            currentMode === 'facade'
              ? 'bg-gradient-to-r from-amber-400 to-yellow-200 text-black shadow-lg shadow-amber-400/30'
              : 'text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.hero.viewModes.luxuryFacade}</span>
        </button>
      </div>

      {/* Telemetry HUD Overlays */}
      <div className="absolute top-6 start-6 pointer-events-none flex flex-col gap-1 text-[10px] font-mono text-amber-400/80 tracking-widest uppercase">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>WEBGL 3D VOLUMETRIC ENGINE ACTIVE</span>
        </div>
        <div className="text-neutral-400">FPS: {fps} // RES: DYNAMIC DPR-2</div>
        <div className="text-neutral-400">STRUCTURE: REINFORCED RC CORE & CANTILEVER</div>
      </div>

      <div className="absolute top-6 end-6 pointer-events-none hidden sm:flex flex-col items-end gap-1 text-[10px] font-mono text-neutral-400 tracking-wider uppercase">
        <div className="flex items-center gap-1 text-amber-300">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '16s' }} />
          <span>AZIMUTH: 315° NW</span>
        </div>
        <div>LAT: 35.792° N // LON: 51.418° E</div>
      </div>
    </div>
  );
};
