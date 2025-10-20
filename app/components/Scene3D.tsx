// app/components/Scene3D.tsx - Fixed: Globe always inside rings
"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Main Globe Group - Contains both globe and rings
function GlobeWithRings() {
  const groupRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const materialRef = useRef<any>(null);

  // Auto rotation for globe
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
    
    if (materialRef.current) {
      materialRef.current.distort = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }

    // Rings auto rotation
    if (ringsRef.current) {
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  useEffect(() => {
    if (!groupRef.current || !materialRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // === HeroSection (0-14%) ===
    tl.to(groupRef.current.position, { 
      y: 0, 
      x: 0, 
      z: 0,
      duration: 0.14 
    }, 0);
    tl.to(groupRef.current.scale, { 
      x: 1, 
      y: 1, 
      z: 1,
      duration: 0.14 
    }, 0);
    tl.to(groupRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.14
    }, 0);

    // === StatsSection (14-18%) ===
    tl.to(groupRef.current.position, { 
      y: -0.5, 
      x: 8,
      duration: 0.40
    });
    tl.to(groupRef.current.rotation, {
      x: Math.PI * 0.8,
      y: Math.PI * 0.8,
      duration: 0.40
    }, "<");
    // Change color to purple
    tl.to(materialRef.current.color, {
      r: 0.56,
      g: 0,
      b: 1,
      duration: 0.40
    }, "<");

    // === FeaturesSection (28-42%) ===
    tl.to(groupRef.current.position, { 
      y: -1, 
      x: -6,
      duration: 0.40
    });
    tl.to(groupRef.current.scale, { 
      x: 1.5, 
      y: 1.5, 
      z: 1.5,
      duration: 0.40
    }, "<");
    tl.to(groupRef.current.rotation, {
      x: -Math.PI * 0.6,
      y: Math.PI * 0.2,
      duration: 0.40
    }, "<");
    // Change color to blue
    tl.to(materialRef.current.color, {
      r: 0.23,
      g: 0.51,
      b: 0.96,
      duration: 0.40
    }, "<");

    // === TimelineSection (42-56%) ===
    tl.to(groupRef.current.position, { 
      y: -2, 
      x: 0,
      duration: 0.30
    });
    tl.to(groupRef.current.rotation, {
      x: Math.PI * 0.5,
      y: -Math.PI * 0.3,
      duration: 0.30
    }, "<");
    // Change color to cyan
    tl.to(materialRef.current.color, {
      r: 0,
      g: 0.94,
      b: 1,
      duration: 0.30
    }, "<");

    // === UseCasesSection (56-70%) ===
    tl.to(groupRef.current.position, { 
      y: -6.5, 
      x: -2.5,
      duration: 0.14 
    });
    tl.to(groupRef.current.scale, { 
      x: 1.3, 
      y: 1.3, 
      z: 1.3,
      duration: 0.14 
    }, "<");
    tl.to(groupRef.current.rotation, {
      x: Math.PI * 0.6,
      y: Math.PI * 0.4,
      duration: 0.14
    }, "<");

    // === TestimonialsSection (70-84%) ===
    tl.to(groupRef.current.position, { 
      y: 3, 
      x: 0,
      duration: 0.14 
    });
    tl.to(groupRef.current.rotation, {
      x: Math.PI * 0.7,
      y: Math.PI * 0.5,
      duration: 0.14
    }, "<");
    // Back to green
    tl.to(materialRef.current.color, {
      r: 0.22,
      g: 1,
      b: 0.08,
      duration: 0.14
    }, "<");

    // === CTASection & Footer (84-100%) ===
    tl.to(groupRef.current.position, { 
      y: 0, 
      x: 0,
      duration: 0.16 
    });
    tl.to(groupRef.current.scale, { 
      x: 0.0, 
      y: 0.0, 
      z: 0.0,
      duration: 0.16 
    }, "<");
    tl.to(groupRef.current.rotation, {
      x: Math.PI * 0.0,
      y: Math.PI * 0.0,
      duration: 0.16
    }, "<");

  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Orbit Rings - Will move with globe */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshBasicMaterial color="#39FF14" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 2, Math.PI / 3, 0]}>
          <torusGeometry args={[3.3, 0.02, 16, 100]} />
          <meshBasicMaterial color="#8F00FF" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[Math.PI / 2, -Math.PI / 3, 0]}>
          <torusGeometry args={[3.6, 0.02, 16, 100]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Globe - Always at center of group */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#39FF14"
          wireframe
          distort={0.3}
          speed={2}
          transparent
          opacity={0.7}
          roughness={0.4}
        />
      </mesh>
      
      {/* Inner glow sphere */}
      <mesh scale={0.95}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#39FF14"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Camera dengan movement dramatis
function DramaticCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // HeroSection - Front view
    tl.to(camera.position, { 
      z: 8, 
      x: 0, 
      y: 0,
      duration: 0.14 
    }, 0);
    tl.to(camera.rotation, {
      x: 0,
      y: 0,
      duration: 0.14
    }, 0);

    // StatsSection - Side angle
    tl.to(camera.position, { 
      z: 10, 
      x: 1, 
      y: 0,
      duration: 0.40
    });
    tl.to(camera.rotation, {
      y: -0.3,
      duration: 0.40
    }, "<");

    // FeaturesSection - Top view
    tl.to(camera.position, { 
      z: 6, 
      x: -1, 
      y: 3,
      duration: 0.40
    });
    tl.to(camera.rotation, {
      x: -0.3,
      y: 0,
      duration: 0.40
    }, "<");

    // TimelineSection - Orbit
    tl.to(camera.position, { 
      z: 5, 
      x: -3, 
      y: 2,
      duration: 0.30
    });
    tl.to(camera.rotation, {
      y: 0.4,
      duration: 0.30
    }, "<");

    // UseCasesSection - Wide view
    tl.to(camera.position, { 
      z: 9, 
      x: 0, 
      y: 0,
      duration: 0.14 
    });

    // TestimonialsSection - Close up
    tl.to(camera.position, { 
      z: 5, 
      x: 0, 
      y: -1,
      duration: 0.14 
    });
    tl.to(camera.rotation, {
      x: 0.2,
      y: 0,
      duration: 0.14
    }, "<");

    // CTASection & Footer - Final position
    tl.to(camera.position, { 
      z: 0, 
      x: 0, 
      y: 0,
      duration: 0.16 
    });
    tl.to(camera.rotation, {
      x: 0,
      y: 0,
      duration: 0.16
    }, "<");

  }, [camera]);

  return null;
}

// Particles dengan dynamic behavior - Mengikuti globe
function DynamicParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesCount = 1000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      pos[i] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [particlesCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  useEffect(() => {
    if (!particlesRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // Follow globe position
    tl.to(particlesRef.current.position, {
      y: 0,
      x: 0,
      duration: 0.14
    }, 0);

    tl.to(particlesRef.current.position, {
      y: -0.5,
      x: 8,
      duration: 0.40
    });

    tl.to(particlesRef.current.position, {
      y: -1,
      x: -6,
      duration: 0.40
    });

    tl.to(particlesRef.current.position, {
      y: -2,
      x: 0,
      duration: 0.30
    });

    tl.to(particlesRef.current.position, {
      y: -6.5,
      x: -2.5,
      duration: 0.14
    });

    tl.to(particlesRef.current.position, {
      y: 3,
      x: 0,
      duration: 0.14
    });

    tl.to(particlesRef.current.position, {
      y: 0,
      x: 0,
      duration: 0.16
    });

    // Scale animations
    const scaleTl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scaleTl.to(particlesRef.current.scale, { 
      x: 3, y: 1, z: 3, duration: 0.14 
    }, 0);
    scaleTl.to(particlesRef.current.scale, { 
      x: 3, y: 1.3, z: 3, duration: 0.40 
    });
    scaleTl.to(particlesRef.current.scale, { 
      x: 3, y: 0.7, z: 3, duration: 0.40
    });
    scaleTl.to(particlesRef.current.scale, { 
      x: 1.5, y: 1.5, z: 1.5, duration: 0.30
    });
    scaleTl.to(particlesRef.current.scale, { 
      x: 3, y: 1, z: 3, duration: 0.14 
    });
    scaleTl.to(particlesRef.current.scale, { 
      x: 0.8, y: 0.8, z: 0.8, duration: 0.14 
    });
    scaleTl.to(particlesRef.current.scale, { 
      x: 0.5, y: 0.5, z: 0.5, duration: 0.16 
    });

  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#39FF14"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating cubes yang muncul di sections tertentu - Mengikuti globe
function FloatingCubes() {
  const cubesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cubesRef.current) {
      cubesRef.current.children.forEach((cube, i) => {
        cube.rotation.x = state.clock.elapsedTime * (0.3 + i * 0.1);
        cube.rotation.y = state.clock.elapsedTime * (0.2 + i * 0.1);
        const floatOffset = Math.sin(state.clock.elapsedTime + i) * 0.5;
        // Keep relative position
        cube.position.y = floatOffset;
      });
    }
  });

  useEffect(() => {
    if (!cubesRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // Follow globe position
    tl.to(cubesRef.current.position, {
      y: 0,
      x: 0,
      duration: 0.14
    }, 0);

    tl.to(cubesRef.current.position, {
      y: -0.5,
      x: 8,
      duration: 0.40
    });

    tl.to(cubesRef.current.position, {
      y: -1,
      x: -6,
      duration: 0.40
    });

    tl.to(cubesRef.current.position, {
      y: -2,
      x: 0,
      duration: 0.30
    });

    tl.to(cubesRef.current.position, {
      y: -6.5,
      x: -2.5,
      duration: 0.14
    });

    tl.to(cubesRef.current.position, {
      y: 3,
      x: 0,
      duration: 0.14
    });

    tl.to(cubesRef.current.position, {
      y: 0,
      x: 0,
      duration: 0.16
    });

    // Scale animations (appear/disappear)
    const scaleTl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scaleTl.to(cubesRef.current.scale, {
      x: 0, y: 0, z: 0, duration: 0.28
    }, 0);

    scaleTl.to(cubesRef.current.scale, {
      x: 1, y: 1, z: 1, duration: 0.14
    });

    scaleTl.to(cubesRef.current.scale, {
      x: 1, y: 1, z: 1, duration: 0.28
    });

    scaleTl.to(cubesRef.current.scale, {
      x: 0, y: 0, z: 0, duration: 0.3
    });

  }, []);

  const cubePositions: [number, number, number][] = [
    [5, 0, -3],
    [-5, 0, -4],
    [4, 0, -5],
    [-4, 0, -3],
  ];

  return (
    <group ref={cubesRef}>
      {cubePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#39FF14" : "#8F00FF"}
            wireframe
            transparent
            opacity={0.4}
            emissive={i % 2 === 0 ? "#39FF14" : "#8F00FF"}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main Scene3D Component
export default function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={["#0A0A0A"]} />
        <fog attach="fog" args={["#0A0A0A", 10, 25]} />
        
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#39FF14" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8F00FF" />
        <spotLight 
          position={[0, 5, 5]} 
          angle={0.5} 
          penumbra={1} 
          intensity={0.5} 
          color="#39FF14" 
        />
        
        <DramaticCamera />
        <GlobeWithRings />
        {!isMobile && <DynamicParticles />}
        {!isMobile && <FloatingCubes />}
        
        <Stars 
          radius={100} 
          depth={50} 
          count={isMobile ? 1000 : 3000} 
          factor={4} 
          fade 
          speed={1} 
        />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}