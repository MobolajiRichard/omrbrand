import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LegalDoc } from "../../../components/LegalDoc";
import { apps, getApp } from "../../../lib/apps";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: PageProps<"/apps/[slug]/support">): Promise<Metadata> {
  const app = getApp((await params).slug);
  return app ? { title: `Support | ${app.name}` } : {};
}

export default async function Page({ params }: PageProps<"/apps/[slug]/support">) {
  const app = getApp((await params).slug);
  if (!app) notFound();

  return (
    <LegalDoc eyebrow={app.name} title="Support" back={{ href: `/apps/${app.slug}`, label: app.name }}>
      <div className="rounded-3xl bg-ink p-8 text-paper md:p-10">
        <p className="eyebrow text-paper/50">Get in touch</p>
        <a
          href={`mailto:${app.supportEmail}?subject=${encodeURIComponent(`${app.name} support`)}`}
          className="display draw-line mt-4 inline-block text-[clamp(1.6rem,3vw,2.6rem)] font-light"
        >
          {app.supportEmail}
        </a>
        <p className="mt-4 max-w-md text-paper/60">
          Tell us your device and app version if something isn&apos;t working. We reply
          immediately.
        </p>
      </div>

      <h2 className="display mt-16 text-4xl font-light">Common questions</h2>
      <div className="mt-6">
        {app.faq.map((item) => (
          <details key={item.q} className="group border-t border-line py-6 last:border-b">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg">
              {item.q}
              <span className="text-2xl text-ink-soft transition-transform duration-300 group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{item.a}</p>
          </details>
        ))}
      </div>

      <p className="mt-12 text-ink-soft">
        See also the{" "}
        <Link href={`/apps/${app.slug}/privacy`} className="text-ink underline underline-offset-4">
          privacy policy
        </Link>{" "}
        and{" "}
        <Link href={`/apps/${app.slug}/terms`} className="text-ink underline underline-offset-4">
          terms of use
        </Link>
        .
      </p>
    </LegalDoc>
  );
}
