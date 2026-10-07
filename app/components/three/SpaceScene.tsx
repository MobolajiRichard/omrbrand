"use client";

import { Sparkles, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import * as THREE from "three";
import { Slab, cssFont, pointer, prefersReducedMotion, useCanvasTexture } from "./shared";

function Planet() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <group position={[-26, -27, -40]}>
      <mesh ref={ref}>
        <sphereGeometry args={[9, 96, 96]} />
        <meshStandardMaterial color="#1f1c86" roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Thin atmosphere glow around the rim */}
      <mesh scale={1.06}>
        <sphereGeometry args={[9, 64, 64]} />
        <meshBasicMaterial color="#8e8bff" transparent opacity={0.08} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Monogram() {
  const ref = useRef<THREE.Group>(null);
  const face = useCanvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = "#f6f3ee";
    ctx.font = `italic 400 230px ${cssFont("--font-fraunces", "Georgia, serif")}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("omr", w / 2, h / 2 - 16);
  });
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.12;
    ref.current.position.set(-3.3 + Math.sin(t) * 0.25, 4.6 + Math.cos(t * 1.3) * 0.2, -6);
    ref.current.rotation.set(0.3 + Math.sin(t) * 0.2, t * 1.5, 0.2);
  });
  return (
    <group ref={ref}>
      <Slab size={[1.4, 1.4, 0.3]} radius={0.3} color="#2f2ba8" roughness={0.25} face={face} />
    </group>
  );
}

function Rig() {
  const stars = useRef<THREE.Group>(null);
  const still = useRef(prefersReducedMotion());
  useFrame((state, dt) => {
    if (stars.current && !still.current) {
      stars.current.rotation.y += dt * 0.008;
      stars.current.rotation.x += dt * 0.003;
    }
    // Look slightly toward the cursor, as if floating.
    easing.damp3(state.camera.position, [pointer.x * 0.8, pointer.y * 0.5, 10], 0.8, dt);
    state.camera.lookAt(0, 0, 0);
  });
  return (
    <group ref={stars}>
      <Stars radius={90} depth={60} count={7000} factor={4} saturation={0} fade speed={0.6} />
      <Sparkles count={70} scale={[24, 14, 10]} size={2.2} speed={0.25} color="#8e8bff" opacity={0.6} />
    </group>
  );
}

export default function SpaceScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 10], fov: 50 }}
      gl={{ antialias: true }}
      style={{ pointerEvents: "none" }}
    >
      <color attach="background" args={["#06060c"]} />
      <ambientLight intensity={0.12} />
      {/* Key light from behind the planet carves a crescent; the fill lights the monogram. */}
      <directionalLight position={[10, 14, -60]} intensity={3.2} color="#e9e6ff" />
      <directionalLight position={[4, 6, 10]} intensity={0.7} />
      <Rig />
      <Planet />
      <Monogram />
    </Canvas>
  );
}
