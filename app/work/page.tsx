import type { Metadata } from "next";
import Link from "next/link";
import { PhoneFrame } from "../components/PhoneFrame";
import { Reveal } from "../components/Reveal";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { apps } from "../lib/apps";

export const metadata: Metadata = {
  title: "Work",
  description: "Apps and websites designed and built by OMR.",
};

// Three phones fanned in 3D (see .fan-* in globals.css); they open up on hover.
const fan = ["fan-left", "fan-mid z-10", "fan-right"];

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 md:px-10 md:pt-24 md:pb-24">
          <p className="eyebrow text-ink-soft">Work</p>
          <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h1 className="display text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.92] font-light">
              Things we&apos;ve <em className="text-indigo">made.</em>
            </h1>
            <p className="max-w-sm text-ink-soft">
              Our own products, built and run by us. Each one has its own page with support,
              privacy and terms.
            </p>
          </div>
        </section>

        <section className="space-y-6 px-3 md:px-6">
          {apps.map((app) => (
            <Reveal key={app.slug}>
              <Link
                href={`/apps/${app.slug}`}
                className="group mx-auto grid max-w-[1500px] overflow-hidden rounded-[2rem] border border-line bg-paper md:grid-cols-12 md:rounded-[3rem]"
              >
                <div
                  className="relative flex h-[440px] items-center justify-center overflow-hidden md:col-span-7 md:h-[620px]"
                  style={{ background: `radial-gradient(closest-side, ${app.accent}2e, ${app.accent}0a 70%, transparent)` }}
                >
                  <div className="relative w-[30%] max-w-[230px] [perspective:1400px] [transform-style:preserve-3d] md:w-[24%]">
                    {app.screens.slice(0, 3).map((screen, i) => (
                      <PhoneFrame
                        key={screen.src}
                        src={screen.src}
                        alt={screen.alt}
                        priority={i === 1}
                        className={`${i === 1 ? "relative" : "absolute inset-0"} ${fan[i]}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-10 p-8 md:col-span-5 md:p-14">
                  <div>
                    <div className="flex items-center gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={app.glyph} alt="" className="size-12 rounded-xl p-2" style={{ background: app.accent }} />
                      <h2 className="text-2xl font-medium">{app.name}</h2>
                    </div>
                    <p className="display mt-8 text-4xl leading-[1.05] font-light md:text-5xl">{app.tagline}</p>
                    <p className="mt-5 leading-relaxed text-ink-soft">{app.summary}</p>
                  </div>

                  <div>
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 text-sm">
                      {[
                        ["Category", app.category],
                        ["Platforms", app.platforms.join(", ")],
                        ["Year", app.year],
                        ["Built with", app.stack.slice(0, 2).join(", ")],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <dt className="eyebrow text-ink-soft">{k}</dt>
                          <dd className="mt-1">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <span className="mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-paper transition-colors group-hover:bg-indigo">
                      View app
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}

          <Reveal>
            <Link
              href="/start"
              className="group mx-auto flex max-w-[1500px] flex-col justify-between gap-10 rounded-[2rem] bg-ink p-8 text-paper md:flex-row md:items-end md:rounded-[3rem] md:p-14"
            >
              <div>
                <p className="eyebrow text-paper/50">Next</p>
                <p className="display mt-6 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1] font-light">
                  Your product <em className="text-indigo-soft">could be here.</em>
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-3 rounded-full bg-paper px-6 py-3.5 text-ink transition-colors group-hover:bg-indigo-soft">
                Start a project
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Reveal>
        </section>
        <div className="h-28 md:h-40" />
      </main>
      <SiteFooter />
    </>
  );
}
