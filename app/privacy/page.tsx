import type { Metadata } from "next";
import { LegalDoc } from "../components/LegalDoc";
import { site, sitePrivacy } from "../lib/site";

export const metadata: Metadata = { title: "Privacy policy" };

export default function Page() {
  return (
    <LegalDoc
      eyebrow="OMR"
      title="Privacy policy"
      updated={site.legalUpdated}
      back={{ href: "/", label: "Home" }}
      sections={sitePrivacy}
    />
  );
}
