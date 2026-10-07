import Link from "next/link";
import { nav } from "../lib/site";

/** Top bar for every page. `tone="dark"` is for pages on a dark background. */
export function SiteHeader({
  tone = "light",
  overlay = false,
}: {
  tone?: "light" | "dark";
  overlay?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <header className={`${overlay ? "absolute inset-x-0 top-0" : "relative"} z-20 ${dark ? "text-paper" : "text-ink"}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-6 md:px-10">
        <Link href="/" className="display flex items-baseline gap-1 text-3xl" aria-label="OMR home">
          omr<span className={`size-1.5 rounded-full ${dark ? "bg-indigo-soft" : "bg-indigo"}`} />
        </Link>
        <nav className="hidden items-center gap-9 text-sm md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`draw-line ${dark ? "text-paper/60 hover:text-paper" : "text-ink-soft hover:text-ink"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/start"
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            dark
              ? "border-paper/40 hover:border-paper hover:bg-paper hover:text-ink"
              : "border-ink hover:bg-ink hover:text-paper"
          }`}
        >
          Start a project
        </Link>
      </div>
    </header>
  );
}
