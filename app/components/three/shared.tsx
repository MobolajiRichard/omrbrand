"use client";

import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { type ReactNode, type RefObject, useEffect, useMemo, useState } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Window-level pointer, so canvases can stay pointer-events: none.     */
/* ------------------------------------------------------------------ */

export const pointer = { x: 0, y: 0 };

if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true },
  );
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Pause a canvas's render loop while it's off-screen. */
export function useInView(ref: RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}

/* ------------------------------------------------------------------ */
/* Canvas-drawn textures                                                */
/* ------------------------------------------------------------------ */

export function cssFont(variable: string, fallback: string) {
  const value = getComputedStyle(document.body).getPropertyValue(variable).trim();
  return value ? `${value}, ${fallback}` : fallback;
}

export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/**
 * A texture drawn with the 2D canvas API. Drawing waits for web fonts so
 * the brand typefaces show up on the 3D surfaces too.
 */
export function useCanvasTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void | Promise<void>,
) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, [width, height]);

  useEffect(() => {
    let cancelled = false;
    const canvas = texture.image as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    document.fonts.ready
      .then(() => draw(ctx, width, height))
      .then(() => {
        if (!cancelled) texture.needsUpdate = true;
      });
    return () => {
      cancelled = true;
    };
    // `draw` is intentionally treated as static for the texture's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texture, width, height]);

  useEffect(() => () => texture.dispose(), [texture]);

  return texture;
}

const imageCache = new Map<string, Promise<HTMLImageElement>>();

export function loadImage(src: string) {
  if (!imageCache.has(src)) {
    imageCache.set(
      src,
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      }),
    );
  }
  return imageCache.get(src)!;
}

/** Screenshot clipped to a rounded rectangle, cover-fit. */
export function useScreenTexture(src: string, radius = 0.09) {
  return useCanvasTexture(1080, 2340, async (ctx, w, h) => {
    const img = await loadImage(src);
    ctx.clearRect(0, 0, w, h);
    roundRect(ctx, 0, 0, w, h, w * radius);
    ctx.clip();
    const scale = Math.max(w / img.width, h / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  });
}

/* ------------------------------------------------------------------ */
/* Slab: a thick rounded tile with an optional textured face.          */
/* ------------------------------------------------------------------ */

type SlabProps = {
  size: [number, number, number];
  radius?: number;
  color: string;
  roughness?: number;
  metalness?: number;
  face?: THREE.Texture;
  faceInset?: number;
  children?: ReactNode;
};

export function Slab({
  size: [w, h, d],
  radius = 0.12,
  color,
  roughness = 0.35,
  metalness = 0.1,
  face,
  faceInset = 0,
  children,
}: SlabProps) {
  return (
    <group>
      <RoundedBox args={[w, h, d]} radius={radius} smoothness={5} castShadow>
        <meshPhysicalMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          clearcoat={1}
          clearcoatRoughness={0.25}
        />
      </RoundedBox>
      {face && (
        <mesh position-z={d / 2 + 0.002}>
          <planeGeometry args={[w - faceInset * 2, h - faceInset * 2]} />
          <meshBasicMaterial map={face} transparent toneMapped={false} />
        </mesh>
      )}
      {children}
    </group>
  );
}

/** A phone: dark body with a screenshot as its screen. */
export function Phone({ src, scale = 1 }: { src: string; scale?: number }) {
  const screen = useScreenTexture(src);
  return (
    <group scale={scale}>
      <Slab
        size={[1.2, 2.5, 0.12]}
        radius={0.16}
        color="#1c1b18"
        metalness={0.55}
        roughness={0.28}
        face={screen}
        faceInset={0.045}
      />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Studio lighting: Lightformers only, so no HDR is fetched.          */
/* ------------------------------------------------------------------ */

export function Studio() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 6]} intensity={1.6} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 6]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[6, 4, 1]} />
        <Lightformer form="rect" intensity={1} color="#c9c4ff" position={[6, -1, 1]} rotation-y={-Math.PI / 2} scale={[6, 4, 1]} />
        <Lightformer form="ring" intensity={2} position={[0, 0, -6]} scale={4} />
      </Environment>
    </>
  );
}
