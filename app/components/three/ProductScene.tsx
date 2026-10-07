"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { type RefObject, useRef } from "react";
import * as THREE from "three";
import {
  Phone,
  Slab,
  Studio,
  loadImage,
  pointer,
  prefersReducedMotion,
  useCanvasTexture,
  useInView,
} from "./shared";

type SceneApp = { screens: [string, string]; glyph: string; color: string };

function AppIcon({ glyph, color }: { glyph: string; color: string }) {
  const face = useCanvasTexture(512, 512, async (ctx, w, h) => {
    const img = await loadImage(glyph);
    ctx.drawImage(img, 0, 0, w, h);
  });
  return (
    <Slab
      size={[0.95, 0.95, 0.2]}
      radius={0.22}
      color={color}
      roughness={0.25}
      face={face}
      faceInset={0.2}
    />
  );
}

function Rig({ section, app }: { section: RefObject<HTMLElement | null>; app: SceneApp }) {
  const root = useRef<THREE.Group>(null);
  const home = useRef<THREE.Group>(null);
  const lyrics = useRef<THREE.Group>(null);
  const icon = useRef<THREE.Group>(null);
  const still = useRef(prefersReducedMotion());
  const fit = useThree((state) => 0.85 * Math.min(1, state.viewport.width / 4.6));

  useFrame((state, dt) => {
    const el = section.current;
    if (!el || !root.current || !home.current || !lyrics.current || !icon.current) return;

    // 0 when the section enters from below, 1 when it leaves at the top.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = THREE.MathUtils.clamp((vh - rect.top) / (vh + rect.height), 0, 1);
    const k = THREE.MathUtils.smoothstep(p, 0.15, 0.65);
    const t = still.current ? 0 : state.clock.elapsedTime;

    easing.dampE(root.current.rotation, [-pointer.y * 0.1, pointer.x * 0.18, 0], 0.6, dt);

    // The home screen turns to face you while the lyrics screen slides alongside.
    const homeX = -0.75 * k;
    const lyricsX = THREE.MathUtils.lerp(0.4, 1.0, k);
    // Keep the pair centred in the canvas at every point of the animation.
    easing.damp(root.current.position, "x", (-(homeX + lyricsX) / 2) * fit, 0.3, dt);
    easing.damp3(home.current.position, [homeX, Math.sin(t * 0.8) * 0.05, 0.4], 0.3, dt);
    easing.dampE(home.current.rotation, [0.05, THREE.MathUtils.lerp(-0.7, 0.12, k), -0.04 * k], 0.3, dt);

    easing.damp3(lyrics.current.position, [lyricsX, 0.15 + Math.sin(t * 0.8 + 2) * 0.05, THREE.MathUtils.lerp(-1.2, -0.3, k)], 0.3, dt);
    easing.dampE(lyrics.current.rotation, [0.02, THREE.MathUtils.lerp(-0.2, -0.32, k), 0.05], 0.3, dt);

    easing.damp3(icon.current.position, [THREE.MathUtils.lerp(-0.5, -1.45, k), 1.6 + Math.sin(t * 1.1) * 0.08, 1], 0.35, dt);
    icon.current.rotation.set(0.25, -0.5 + Math.sin(t * 0.6) * 0.25 + k * 0.6, -0.08);
  });

  return (
    <group ref={root} scale={fit}>
      <group ref={lyrics}>
        <Phone src={app.screens[1]} />
      </group>
      <group ref={home}>
        <Phone src={app.screens[0]} />
      </group>
      <group ref={icon}>
        <AppIcon glyph={app.glyph} color={app.color} />
      </group>
    </group>
  );
}

export default function ProductScene({
  section,
  ...app
}: SceneApp & {
  section: RefObject<HTMLElement | null>;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        dpr={[1, 2]}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 0, 8], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "none" }}
      >
        <Studio />
        <Rig section={section} app={app} />
        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.35}
          scale={9}
          blur={2.4}
          far={3}
          color="#2a1a4a"
        />
      </Canvas>
    </div>
  );
}
