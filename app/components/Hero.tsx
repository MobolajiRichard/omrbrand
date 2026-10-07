import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { HeroScene } from "./three";

export function Hero() {
  return (
    <section className="relative overflow-hidden md:min-h-[100svh]">
      <SiteHeader overlay />

      <div className="relative z-10 mx-auto grid max-w-[1400px] px-5 pt-36 md:min-h-[100svh] md:grid-cols-12 md:items-center md:px-10 md:pt-0">
        <div className="md:col-span-6 lg:col-span-5">
          <p className="eyebrow text-ink-soft">Software studio</p>
          <h1 className="display mt-6 text-[clamp(3.2rem,7vw,7rem)] leading-[0.92] font-light">
            Apps &amp; websites, <em className="text-indigo">built to be kept.</em>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
            OMR designs and engineers mobile apps and websites, from the first sketch to the
            App Store and every update after.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/start"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-indigo"
            >
              Start a project
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/work" className="draw-line pb-0.5">
              See our work
            </Link>
          </div>
        </div>
      </div>

      <div className="relative h-[64svh] [mask-image:linear-gradient(to_bottom,black_80%,transparent)] md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[62%]">
        <HeroScene />
      </div>

      <div className="eyebrow pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto hidden max-w-[1400px] justify-between px-10 pb-8 text-ink-soft md:flex">
        <span>Scroll</span>
        <span>
          Now shipping: <span className="text-ink">UnifiedHymnal</span>
        </span>
      </div>
    </section>
  );
}
