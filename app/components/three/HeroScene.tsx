"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { type ReactNode, useRef } from "react";
import * as THREE from "three";
import {
  Phone,
  Slab,
  Studio,
  cssFont,
  pointer,
  prefersReducedMotion,
  roundRect,
  useCanvasTexture,
  useInView,
} from "./shared";

type Vec3 = [number, number, number];

// Scroll progress through the hero, 0 → 1. Shared by every item.
const scroll = { value: 0 };

function Item({
  position,
  rotation,
  index,
  children,
}: {
  position: Vec3;
  rotation: Vec3;
  index: number;
  children: ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const still = useRef(prefersReducedMotion());

  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const s = scroll.value;
    const bob = still.current ? 0 : Math.sin(t * 0.7 + index * 1.7) * 0.07;
    const sway = still.current ? 0 : Math.sin(t * 0.5 + index) * 0.03;

    // Fan outwards and drift up as the hero scrolls away.
    easing.damp3(
      g.position,
      [
        position[0] * (1 + s * 0.45),
        position[1] * (1 + s * 0.3) + bob + s * 0.9,
        position[2] + s * (1.2 - index * 0.25),
      ],
      0.35 + index * 0.06,
      dt,
    );
    easing.dampE(
      g.rotation,
      [rotation[0] + sway, rotation[1] + s * 0.5 * (index % 2 ? 1 : -1), rotation[2] - sway],
      0.4 + index * 0.05,
      dt,
    );
  });

  // Each item starts low and behind, then settles into place.
  return (
    <group ref={ref} position={[position[0] * 0.2, -2.5, -4]} rotation={[0.6, 0, 0]}>
      {children}
    </group>
  );
}

function BrowserSlab() {
  const face = useCanvasTexture(1228, 800, (ctx, w, h) => {
    const display = cssFont("--font-fraunces", "Georgia, serif");
    const sans = cssFont("--font-geist-sans", "system-ui, sans-serif");
    const mono = cssFont("--font-geist-mono", "monospace");

    roundRect(ctx, 0, 0, w, h, 34);
    ctx.fillStyle = "#f6f3ee";
    ctx.fill();
    ctx.save();
    ctx.clip();

    // Window chrome
    ctx.fillStyle = "#e7e2d8";
    ctx.fillRect(0, 0, w, 66);
    ["#d4cec2", "#d4cec2", "#d4cec2"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(40 + i * 30, 33, 9, 0, Math.PI * 2);
      ctx.fill();
    });
    roundRect(ctx, w / 2 - 170, 17, 340, 32, 16);
    ctx.fillStyle = "#f6f3ee";
    ctx.fill();
    ctx.fillStyle = "#8a867c";
    ctx.font = `20px ${mono}`;
    ctx.textAlign = "center";
    ctx.fillText("omrbrand.com", w / 2, 40);
    ctx.textAlign = "left";

    // Nav
    ctx.fillStyle = "#16150f";
    ctx.font = `500 34px ${display}`;
    ctx.fillText("omr", 64, 138);
    ctx.fillStyle = "#2f2ba8";
    ctx.beginPath();
    ctx.arc(64 + ctx.measureText("omr").width + 8, 133, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#c9c4b8";
    [0, 1, 2].forEach((i) => {
      roundRect(ctx, w - 360 + i * 100, 122, 70, 10, 5);
      ctx.fill();
    });

    // Headline
    ctx.fillStyle = "#16150f";
    ctx.font = `400 104px ${display}`;
    ctx.fillText("Built to be", 64, 300);
    ctx.fillStyle = "#2f2ba8";
    ctx.font = `italic 400 104px ${display}`;
    ctx.fillText("kept.", 64, 410);

    // Body copy
    ctx.fillStyle = "#d6d1c6";
    [460, 300, 380].forEach((lw, i) => {
      roundRect(ctx, 64, 470 + i * 30, lw, 12, 6);
      ctx.fill();
    });

    // Button
    roundRect(ctx, 64, 600, 250, 64, 32);
    ctx.fillStyle = "#16150f";
    ctx.fill();
    ctx.fillStyle = "#f6f3ee";
    ctx.font = `500 24px ${sans}`;
    ctx.fillText("Start a project  →", 94, 640);

    // Feature image
    const gx = 700;
    const gy = 170;
    const gs = 460;
    const grad = ctx.createLinearGradient(gx, gy, gx + gs, gy + gs);
    grad.addColorStop(0, "#2f2ba8");
    grad.addColorStop(1, "#b9b5ff");
    roundRect(ctx, gx, gy, gs, gs * 1.1, 28);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.fillStyle = "rgba(246,243,238,0.9)";
    ctx.beginPath();
    ctx.arc(gx + gs * 0.62, gy + gs * 0.45, 96, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  return <Slab size={[3.4, 2.25, 0.14]} radius={0.12} color="#e2ddd3" face={face} faceInset={0.05} />;
}

function CodeSlab() {
  const face = useCanvasTexture(1060, 640, (ctx) => {
    const mono = cssFont("--font-geist-mono", "monospace");
    ["#3a3830", "#3a3830", "#3a3830"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(52 + i * 30, 56, 9, 0, Math.PI * 2);
      ctx.fill();
    });

    const lines: [string, string][][] = [
      [["const ", "#8e8bff"], ["app ", "#eeeae2"], ["= ", "#7d796f"], ["await ", "#8e8bff"], ["omr.build({", "#eeeae2"]],
      [["  platforms: ", "#7d796f"], ['["ios", "android", "web"]', "#e6a57e"], [",", "#7d796f"]],
      [["  design: ", "#7d796f"], ['"considered"', "#e6a57e"], [",", "#7d796f"]],
      [["  craft: ", "#7d796f"], ['"obsessive"', "#e6a57e"], [",", "#7d796f"]],
      [["});", "#eeeae2"]],
      [],
      [["app.", "#eeeae2"], ["ship", "#8e8bff"], ["();", "#eeeae2"]],
    ];
    ctx.font = `32px ${mono}`;
    lines.forEach((tokens, row) => {
      let x = 52;
      tokens.forEach(([text, color]) => {
        ctx.fillStyle = color;
        ctx.fillText(text, x, 150 + row * 62);
        x += ctx.measureText(text).width;
      });
    });
  });

  return (
    <Slab
      size={[2.2, 1.35, 0.12]}
      radius={0.1}
      color="#1a1915"
      roughness={0.3}
      metalness={0.4}
      face={face}
      faceInset={0.04}
    />
  );
}

function Monogram() {
  const face = useCanvasTexture(512, 512, (ctx, w, h) => {
    const display = cssFont("--font-fraunces", "Georgia, serif");
    ctx.fillStyle = "#f6f3ee";
    ctx.font = `italic 400 230px ${display}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("omr", w / 2, h / 2 - 16);
  });
  return (
    <Slab
      size={[1.05, 1.05, 0.24]}
      radius={0.22}
      color="#2f2ba8"
      roughness={0.22}
      metalness={0.15}
      face={face}
    />
  );
}

function Composition() {
  const root = useRef<THREE.Group>(null);
  // The composition is ~6.2 units wide; shrink it to fit narrow (phone) canvases.
  const fit = useThree((state) => Math.min(1, state.viewport.width / 6.2));

  useFrame((state, dt) => {
    scroll.value = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
    if (!root.current) return;
    easing.dampE(
      root.current.rotation,
      [-pointer.y * 0.12, pointer.x * 0.22, 0],
      0.6,
      dt,
    );
  });

  return (
    <group ref={root} position={[-0.25 * fit, 0.1, 0]} scale={fit}>
      <Item index={0} position={[-0.55, 0.85, -1.3]} rotation={[0.04, 0.32, -0.03]}>
        <BrowserSlab />
      </Item>
      <Item index={1} position={[1.35, -0.1, 0.5]} rotation={[0.02, -0.3, 0.04]}>
        <Phone src="/work/hymnal-home.jpg" scale={0.95} />
      </Item>
      <Item index={2} position={[-1.15, -1.3, 0.25]} rotation={[-0.06, 0.3, 0.05]}>
        <CodeSlab />
      </Item>
      <Item index={3} position={[2.15, 0.85, -0.6]} rotation={[0.03, -0.5, 0.06]}>
        <Phone src="/work/hymnal-lyrics.jpg" scale={0.72} />
      </Item>
      <Item index={4} position={[0.25, -1.85, 1.3]} rotation={[0.25, -0.25, -0.12]}>
        <Monogram />
      </Item>
      <Item index={5} position={[2.25, -1.55, 1]} rotation={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.2, 48, 48]} />
          <meshPhysicalMaterial color="#e6a57e" roughness={0.2} clearcoat={1} />
        </mesh>
      </Item>
    </group>
  );
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        dpr={[1, 2]}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 0, 10], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "none" }}
      >
        <Studio />
        <Composition />
        <ContactShadows
          position={[0, -2.75, 0]}
          opacity={0.32}
          scale={14}
          blur={2.8}
          far={5}
          color="#2a2618"
        />
      </Canvas>
    </div>
  );
}
