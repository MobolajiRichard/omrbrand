"use client";

import dynamic from "next/dynamic";

// WebGL scenes are client-only and load after the page's text is on screen.
export const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });
export const ProductScene = dynamic(() => import("./ProductScene"), { ssr: false });
export const SpaceScene = dynamic(() => import("./SpaceScene"), { ssr: false });
