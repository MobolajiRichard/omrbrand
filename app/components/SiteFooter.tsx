import Link from "next/link";
import { apps } from "../lib/apps";
import { site } from "../lib/site";
import { Reveal } from "./Reveal";

const columns = [
  {
    title: "Studio",
    links: [
      { href: "/work", label: "Work" },
      { href: "/#services", label: "Services" },
      { href: "/#process", label: "Process" },
      { href: "/start", label: "Start a project" },
    ],
  },
  {
    title: "Apps",
    links: apps.map((app) => ({ href: `/apps/${app.slug}`, label: app.name })),
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of use" },
    ],
  },
];

/** Dark footer. `cta` adds the large "Have an idea?" block above the links. */
export function SiteFooter({ cta = false }: { cta?: boolean }) {
  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 pt-24 pb-10 md:px-10 md:pt-36">
        {cta && (
          <div className="mb-24 md:mb-32">
            <Reveal>
              <h2 className="display text-[clamp(3rem,8vw,8rem)] leading-[0.92] font-light">
                Have an idea?
                <br />
                <em className="text-indigo-soft">Let&apos;s build it.</em>
              </h2>
            </Reveal>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Link
                href="/start"
                className="group inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 text-ink transition-colors hover:bg-indigo-soft"
              >
                Start a project
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a href={`mailto:${site.email}`} className="draw-line text-paper/70 hover:text-paper">
                or email {site.email}
              </a>
            </div>
          </div>
        )}

        <div className="grid gap-12 border-t border-paper/15 pt-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="display text-4xl">
              omr<span className="text-indigo-soft">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-paper/55">
              A studio designing and building apps and websites.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <p className="eyebrow text-paper/40">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="draw-line text-paper/75 hover:text-paper">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-2">
            <p className="eyebrow text-paper/40">Contact</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${site.email}`} className="draw-line text-paper/75 hover:text-paper">
                  Email
                </a>
              </li>
              <li>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="draw-line text-paper/75 hover:text-paper">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="eyebrow mt-16 flex flex-col justify-between gap-4 text-paper/40 md:flex-row">
          <span>© 2026 OMR. All rights reserved.</span>
          <a href="#" className="draw-line w-fit hover:text-paper">
            Back to top ↑
          </a>
        </div>
      </div>

      <p
        aria-hidden
        className="display pointer-events-none -mb-[0.22em] text-center text-[34vw] leading-none font-light text-paper/[0.06] italic select-none"
      >
        omr
      </p>
    </footer>
  );
}
