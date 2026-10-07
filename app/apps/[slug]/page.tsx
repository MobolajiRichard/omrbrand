import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShowcase, StoreButtons } from "../../components/AppPieces";
import { PhoneFrame } from "../../components/PhoneFrame";
import { Reveal } from "../../components/Reveal";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { apps, getApp } from "../../lib/apps";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: PageProps<"/apps/[slug]">): Promise<Metadata> {
  const app = getApp((await params).slug);
  if (!app) return {};
  return { title: app.name, description: `${app.tagline} ${app.summary}` };
}

/** "Every hymn. Every denomination. One app." → last sentence set in italics. */
function Tagline({ text, accent }: { text: string; accent: string }) {
  const parts = text.split(/(?<=\.)\s+/);
  const last = parts.pop();
  return (
    <>
      {parts.join(" ")} <em style={{ color: accent }}>{last}</em>
    </>
  );
}

export default async function AppPage({ params }: PageProps<"/apps/[slug]">) {
  const app = getApp((await params).slug);
  if (!app) notFound();

  const base = `/apps/${app.slug}`;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid max-w-[1400px] px-5 md:grid-cols-12 md:px-10">
          <div className="pt-12 md:col-span-5 md:pt-24 md:pb-24">
            <Link href="/work" className="draw-line text-sm text-ink-soft hover:text-ink">
              ← All work
            </Link>
            <div className="mt-10 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={app.glyph}
                alt={`${app.name} icon`}
                className="size-16 rounded-[1.1rem] p-3"
                style={{ background: app.accent, boxShadow: `0 14px 34px -12px ${app.accent}` }}
              />
              <div>
                <p className="text-xl font-medium">{app.name}</p>
                <p className="text-sm text-ink-soft">
                  {app.category} · {app.price}
                </p>
              </div>
            </div>
            <h1 className="display mt-10 text-[clamp(2.8rem,5.4vw,5.2rem)] leading-[0.98] font-light">
              <Tagline text={app.tagline} accent={app.accent} />
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">{app.summary}</p>
            <div className="mt-10">
              <StoreButtons app={app} />
            </div>
          </div>
          <div className="-mx-5 md:col-span-7 md:mx-0">
            <AppShowcase app={app} sticky={false} />
          </div>
        </section>

        {/* Numbers */}
        <section className="mx-auto max-w-[1400px] px-5 md:px-10">
          <dl className="grid grid-cols-3 border-y border-line">
            {app.stats.map((stat, i) => (
              <div key={stat.label} className={`py-8 md:py-12 ${i ? "border-l border-line pl-4 md:pl-10" : ""}`}>
                <dd className="display text-4xl font-light md:text-7xl">{stat.value}</dd>
                <dt className="eyebrow mt-3 text-[0.6rem] text-ink-soft sm:text-[0.72rem]">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </section>

        {/* About */}
        <section className="mx-auto grid max-w-[1400px] gap-10 px-5 py-28 md:grid-cols-12 md:px-10 md:py-40">
          <p className="eyebrow text-ink-soft md:col-span-4">About the app</p>
          <div className="space-y-6 md:col-span-8">
            {app.description.map((para, i) => (
              <Reveal key={i} delay={i * 80}>
                <p
                  className={
                    i === 0
                      ? "display text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.15] font-light"
                      : "max-w-2xl text-lg leading-relaxed text-ink-soft"
                  }
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Screens */}
        <section className="overflow-hidden px-3 md:px-6">
          <div
            className="mx-auto max-w-[1500px] rounded-[2rem] px-5 py-20 md:rounded-[3rem] md:px-14 md:py-28"
            style={{ background: `${app.accent}12` }}
          >
            <p className="eyebrow text-ink-soft">Screens</p>
            <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:gap-12 md:overflow-visible">
              {app.screens.map((screen, i) => (
                <Reveal key={screen.src} delay={i * 100} className="w-[64vw] shrink-0 snap-center md:w-auto">
                  <PhoneFrame src={screen.src} alt={screen.alt} className="mx-auto max-w-[320px]" />
                  <p className="mx-auto mt-6 max-w-[320px] text-sm text-ink-soft">{screen.alt}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
          <h2 className="display text-5xl leading-[1] font-light md:text-6xl">
            What&apos;s <em>inside.</em>
          </h2>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {app.features.map((feature, i) => (
              <Reveal as="li" key={feature.title} delay={(i % 3) * 80} className="bg-bone">
                <div className="h-full p-8 transition-colors duration-500 hover:bg-paper md:p-10">
                  <span className="eyebrow" style={{ color: app.accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-6 text-3xl font-light">{feature.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{feature.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="eyebrow mt-10 text-ink-soft">Built with {app.stack.join(" · ")}</p>
        </section>

        {/* Help & legal */}
        <section className="mx-auto max-w-[1400px] px-5 pb-28 md:px-10 md:pb-40">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { href: `${base}/support`, title: "Support", body: "Answers to common questions, and how to reach us." },
              { href: `${base}/privacy`, title: "Privacy policy", body: "We don't collect personal data. Here's exactly what that means." },
              { href: `${base}/terms`, title: "Terms of use", body: "The rules for using the app, in plain language." },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-48 flex-col justify-between rounded-3xl border border-line p-8 transition-colors hover:border-ink hover:bg-paper"
              >
                <h3 className="display flex items-center justify-between text-3xl font-light">
                  {item.title}
                  <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                </h3>
                <p className="text-ink-soft">{item.body}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
