import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDoc } from "../../../components/LegalDoc";
import { apps, getApp } from "../../../lib/apps";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: PageProps<"/apps/[slug]/terms">): Promise<Metadata> {
  const app = getApp((await params).slug);
  return app ? { title: `Terms of use | ${app.name}` } : {};
}

export default async function Page({ params }: PageProps<"/apps/[slug]/terms">) {
  const app = getApp((await params).slug);
  if (!app) notFound();
  return (
    <LegalDoc
      eyebrow={app.name}
      title="Terms of use"
      updated={app.legalUpdated}
      back={{ href: `/apps/${app.slug}`, label: app.name }}
      sections={app.terms}
    />
  );
}
