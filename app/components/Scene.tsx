// ============================================
// FILE: app/components/Scene.tsx (Updated with blur effects)
// ============================================
"use client";

import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";

function AnimatedMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        x: "+=6",
        y: "+=3",
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  return (
    <Icosahedron ref={meshRef} args={[2, 0]}>
      <meshStandardMaterial color={"#39FF14"} wireframe />
    </Icosahedron>
  );
}

function FloatingOrbs() {
  return (
    <>
      {/* Green orb */}
      <mesh position={[-3, 2, -2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#39FF14" emissive="#39FF14" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Purple orb */}
      <mesh position={[3, -1, -3]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#8F00FF" emissive="#8F00FF" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Blue orb */}
      <mesh position={[0, -2, -1]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.5} />
      </mesh>
    </>
  );
}

export default function Scene() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[1, 1, 1]} />
        <AnimatedMesh />
        <FloatingOrbs />
      </Canvas>
      
      {/* Blur overlay */}
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          backdropFilter: "blur(80px)",
          WebkitBackdropFilter: "blur(80px)",
          pointerEvents: "none"
        }}
      />
    </>
  );
}