import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { SpaceScene } from "../components/three";
import { site } from "../lib/site";
import { StartForm } from "./StartForm";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Tell OMR about the app or website you want to build.",
};

const next = [
  "We read your message and reply immediately.",
  "A short call to understand the idea and the people it's for.",
  "A clear proposal: scope, timeline and cost. No surprises.",
];

export default function StartPage() {
  return (
    <div className="flex flex-1 flex-col bg-[#06060c]">
      <div className="fixed inset-0">
        <SpaceScene />
      </div>

      <div className="relative">
        <SiteHeader tone="dark" />
        <main className="mx-auto grid max-w-[1400px] gap-16 px-5 pt-12 pb-32 md:px-10 md:pt-20 lg:grid-cols-12">
          <div className="text-paper lg:col-span-5">
            <p className="eyebrow text-paper/50">Start a project</p>
            <h1 className="display mt-6 text-[clamp(3rem,6vw,5.6rem)] leading-[0.95] font-light">
              Let&apos;s build <em className="text-indigo-soft">something good.</em>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-paper/60">
              Tell us a little about what you have in mind. It doesn&apos;t need to be polished; that&apos;s
              what we&apos;re for.
            </p>

            <p className="eyebrow mt-16 text-paper/40">What happens next</p>
            <ol className="mt-6 space-y-5">
              {next.map((step, i) => (
                <li key={step} className="flex gap-5 text-paper/75">
                  <span className="display text-2xl text-indigo-soft italic">{i + 1}</span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>

            <p className="mt-16 text-paper/50">
              Prefer to talk directly?{" "}
              <a href={`mailto:${site.email}`} className="draw-line text-paper">
                {site.email}
              </a>{" "}
              or{" "}
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="draw-line text-paper">
                WhatsApp
              </a>
              .
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="float-card rounded-[2rem] border border-paper/10 bg-[#0d0d1a]/55 p-7 shadow-[0_0_120px_-30px_rgb(142_139_255/0.45)] backdrop-blur-xl md:p-12">
              <StartForm />
            </div>
          </div>
        </main>
      </div>

      <div className="relative">
        <SiteFooter />
      </div>
    </div>
  );
}
