"use client";

import { useRef } from "react";
import type { App } from "../lib/apps";
import { ProductScene } from "./three";

/** 3D phones + icon for an app. Pinned on desktop while the column scrolls. */
export function AppShowcase({ app, sticky = true }: { app: App; sticky?: boolean }) {
  const column = useRef<HTMLDivElement>(null);
  const [front, , back] = app.screens;

  return (
    <div ref={column} className="h-full">
      <div
        className={`relative h-[58svh] min-h-[420px] ${sticky ? "md:sticky md:top-0 md:h-[100svh]" : "md:h-full md:min-h-[640px]"}`}
      >
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(closest-side, ${app.accent}24, transparent)` }}
        />
        <ProductScene
          section={column}
          screens={[front.src, (back ?? front).src]}
          glyph={app.glyph}
          color={app.accent}
        />
      </div>
    </div>
  );
}

export function StoreButtons({ app, tone = "light" }: { app: App; tone?: "light" | "dark" }) {
  const stores = [
    { label: "App Store", href: app.links.appStore, platform: "iOS" },
    { label: "Google Play", href: app.links.playStore, platform: "Android" },
  ].filter((s) => app.platforms.includes(s.platform));

  const solid = tone === "dark" ? "bg-paper text-ink hover:bg-indigo-soft" : "bg-ink text-paper hover:bg-indigo";
  const muted = tone === "dark" ? "border-paper/20 text-paper/50" : "border-line text-ink-soft";

  return (
    <div className="flex flex-wrap gap-3">
      {stores.map((store) =>
        store.href ? (
          <a
            key={store.label}
            href={store.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-4 rounded-2xl px-5 py-3 transition-colors ${solid}`}
          >
            <span className="flex flex-col leading-tight">
              <span className="text-[0.65rem] tracking-wide uppercase opacity-60">Get it on</span>
              <span className="font-medium">{store.label}</span>
            </span>
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        ) : (
          <span key={store.label} className={`flex flex-col rounded-2xl border px-5 py-3 leading-tight ${muted}`}>
            <span className="text-[0.65rem] tracking-wide uppercase opacity-70">Coming soon to</span>
            <span className="font-medium">{store.label}</span>
          </span>
        ),
      )}
    </div>
  );
}
