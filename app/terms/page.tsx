import type { Metadata } from "next";
import { LegalDoc } from "../components/LegalDoc";
import { site, siteTerms } from "../lib/site";

export const metadata: Metadata = { title: "Terms of use" };

export default function Page() {
  return (
    <LegalDoc
      eyebrow="OMR"
      title="Terms of use"
      updated={site.legalUpdated}
      back={{ href: "/", label: "Home" }}
      sections={siteTerms}
    />
  );
}
