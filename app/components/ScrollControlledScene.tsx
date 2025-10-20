"use client";

import { useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Komponen Sphere yang akan kita animasikan
function GlobeSphere() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <MeshDistortMaterial
        color="#39FF14"
        wireframe
        distort={0.4}
        speed={2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// Komponen utama yang berisi logika animasi GSAP
function SceneAnimator({ container }: { container: React.RefObject<HTMLElement> }) {
  const { camera } = useThree();
  const sphereRef = useRef<THREE.Group>(null);

  // useGSAP adalah hook resmi dari GSAP untuk React
  useGSAP(() => {
    if (!sphereRef.current) return;

    // Pastikan container page.tsx menjadi referensi utama
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top", // Mulai saat bagian atas container bertemu atas viewport
        end: "bottom bottom", // Selesai saat bagian bawah container bertemu bawah viewport
        scrub: 1.5, // Membuat animasi smooth saat scroll (angka > 0)
      },
    });

    // --- DEFINISIKAN TIMELINE ANIMASI DI SINI ---
    // Animasi ini akan berjalan berurutan saat user scroll ke bawah

    // 1. Adegan Awal (Hero Section)
    tl.to(sphereRef.current.rotation, { x: 0, y: 0, z: 0 }, 0);
    tl.to(camera.position, { x: 0, y: 0, z: 5 }, 0);

    // 2. Saat scroll ke FeaturesSection
    tl.to(sphereRef.current.rotation, {
      x: Math.PI / 4,
      y: Math.PI / 2,
    }, ">"); // Tanda ">" berarti mulai setelah animasi sebelumnya selesai
    tl.to(camera.position, {
      x: 3,
      y: 2,
      z: 6,
      ease: "power1.inOut",
    }, "<"); // Tanda "<" berarti mulai bersamaan dengan animasi sebelumnya

    // 3. Saat scroll ke TimelineSection
     tl.to(sphereRef.current.rotation, {
      x: -Math.PI / 3,
      y: Math.PI,
    }, ">");
    tl.to(camera.position, {
      x: -4,
      y: -1,
      z: 7,
      ease: "power1.inOut",
    }, "<");

    // 4. Kembali ke tengah saat mendekati akhir
    tl.to(sphereRef.current.rotation, {
      x: 0,
      y: Math.PI * 1.5,
    }, ">");
     tl.to(camera.position, {
      x: 0,
      y: 0,
      z: 5.5,
      ease: "power1.inOut",
    }, "<");

  }, { scope: container }); // scope ke container utama

  return (
    <group ref={sphereRef}>
      <GlobeSphere />
    </group>
  );
}

export default function ScrollControlledScene({ container }: { container: React.RefObject<HTMLElement> }) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={["#0A0A0A"]} />
        <fog attach="fog" args={["#0A0A0A", 5, 25]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#39FF14" />
        
        <SceneAnimator container={container} />
        
        <Stars radius={50} depth={50} count={5000} factor={4} fade speed={1} />
        {/* Hapus OrbitControls jika kamu ingin gerakan kamera 100% dikontrol oleh GSAP */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
}