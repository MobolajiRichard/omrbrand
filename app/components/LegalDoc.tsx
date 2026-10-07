import Link from "next/link";
import type { ReactNode } from "react";
import type { LegalSection } from "../lib/apps";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/** Shared layout for privacy policies, terms and support pages. */
export function LegalDoc({
  eyebrow,
  title,
  updated,
  back,
  sections,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  back?: { href: string; label: string };
  sections?: LegalSection[];
  children?: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-5 pt-16 pb-28 md:px-10 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-4">
            <div className="md:sticky md:top-10">
              {back && (
                <Link href={back.href} className="draw-line text-sm text-ink-soft hover:text-ink">
                  ← {back.label}
                </Link>
              )}
              <p className="eyebrow mt-10 text-ink-soft">{eyebrow}</p>
              <h1 className="display mt-4 text-5xl leading-[1] font-light md:text-6xl">{title}</h1>
              {updated && <p className="mt-6 text-sm text-ink-soft">Last updated {updated}</p>}
              {sections && (
                <ol className="mt-10 hidden space-y-2 text-sm md:block">
                  {sections.map((s, i) => (
                    <li key={s.title}>
                      <a href={`#s${i + 1}`} className="draw-line text-ink-soft hover:text-ink">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </aside>

          <article className="md:col-span-7 md:col-start-6">
            {children}
            {sections?.map((section, i) => (
              <section key={section.title} id={`s${i + 1}`} className="scroll-mt-10 border-t border-line py-10">
                <h2 className="display flex gap-4 text-3xl font-light">
                  <span className="eyebrow pt-3 text-indigo">{String(i + 1).padStart(2, "0")}</span>
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 pl-10 leading-relaxed text-ink-soft">
                  {section.body.map((block, j) =>
                    Array.isArray(block) ? (
                      <ul key={j} className="space-y-2">
                        {block.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-indigo" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p key={j}>{block}</p>
                    ),
                  )}
                </div>
              </section>
            ))}
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
