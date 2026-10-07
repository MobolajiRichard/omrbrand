import Link from "next/link";
import { apps } from "../lib/apps";
import { AppShowcase } from "./AppPieces";
import { Reveal } from "./Reveal";

/** Home page spotlight on our latest app. */
export function Featured() {
  const app = apps[0];

  return (
    <section id="work" className="scroll-mt-10 px-3 md:px-6">
      <div className="mx-auto max-w-[1500px] overflow-hidden rounded-[2rem] border border-line bg-paper md:rounded-[3rem]">
        <div className="grid md:grid-cols-12">
          <div className="px-6 pt-16 md:col-span-5 md:px-14 md:py-24">
            <p className="eyebrow flex items-center gap-3 text-ink-soft">
              <span className="text-indigo">02</span>
              <span className="h-px w-8 bg-line" />
              Our own product
            </p>

            <Reveal className="mt-10 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={app.glyph}
                alt=""
                className="size-14 rounded-2xl p-2.5"
                style={{ background: app.accent, boxShadow: `0 12px 30px -10px ${app.accent}99` }}
              />
              <div>
                <h2 className="text-xl font-medium">{app.name}</h2>
                <p className="text-sm text-ink-soft">{app.platforms.join(" & ")}</p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <p className="display mt-10 text-[clamp(2.3rem,4vw,3.6rem)] leading-[1.02] font-light">
                Every hymn. Every denomination.{" "}
                <em style={{ color: app.accent }}>One app.</em>
              </p>
              <p className="mt-6 leading-relaxed text-ink-soft">{app.description[0]}</p>
            </Reveal>

            <Reveal delay={140} as="dl" className="mt-10 grid grid-cols-3 border-y border-line">
              {app.stats.map((stat, i) => (
                <div key={stat.label} className={`py-6 ${i ? "border-l border-line pl-3 sm:pl-5" : ""}`}>
                  <dt className="eyebrow text-[0.6rem] text-ink-soft sm:text-[0.72rem]">{stat.label}</dt>
                  <dd className="display mt-2 text-4xl font-light">{stat.value}</dd>
                </div>
              ))}
            </Reveal>

            <ul className="mt-8 space-y-3">
              {app.features.slice(0, 5).map((feature) => (
                <li key={feature.title} className="flex items-baseline gap-3 text-ink-soft">
                  <span
                    className="size-1.5 shrink-0 translate-y-[-2px] rounded-full"
                    style={{ background: app.accent }}
                  />
                  {feature.body}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href={`/apps/${app.slug}`}
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-indigo"
              >
                Explore {app.name}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/work" className="draw-line">
                All work
              </Link>
            </div>
          </div>

          <div className="md:col-span-7">
            <AppShowcase app={app} />
          </div>
        </div>
      </div>
    </section>
  );
}
