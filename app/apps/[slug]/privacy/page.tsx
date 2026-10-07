import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDoc } from "../../../components/LegalDoc";
import { apps, getApp } from "../../../lib/apps";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: PageProps<"/apps/[slug]/privacy">): Promise<Metadata> {
  const app = getApp((await params).slug);
  return app ? { title: `Privacy policy | ${app.name}` } : {};
}

export default async function Page({ params }: PageProps<"/apps/[slug]/privacy">) {
  const app = getApp((await params).slug);
  if (!app) notFound();
  return (
    <LegalDoc
      eyebrow={app.name}
      title="Privacy policy"
      updated={app.legalUpdated}
      back={{ href: `/apps/${app.slug}`, label: app.name }}
      sections={app.privacy}
    />
  );
}
