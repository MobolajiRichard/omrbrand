import { services, steps } from "../lib/site";
import { Reveal } from "./Reveal";

const container = "mx-auto max-w-[1400px] px-5 md:px-10";

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-3 text-ink-soft">
      <span className="text-indigo">{index}</span>
      <span className="h-px w-8 bg-line" />
      {children}
    </p>
  );
}

export function Statement() {
  return (
    <section className={`${container} py-28 md:py-44`}>
      <Reveal>
        <p className="display max-w-5xl text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.12] font-light">
          We&apos;re a small studio for people who care how software feels.{" "}
          <span className="text-ink-soft">
            Fewer features, done properly, so what we make
          </span>{" "}
          <em className="text-indigo">earns its place</em>{" "}
          <span className="text-ink-soft">on a home screen.</span>
        </p>
      </Reveal>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className={`${container} scroll-mt-10 pb-28 md:pb-40`}>
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-12">
            <SectionLabel index="01">Services</SectionLabel>
            <h2 className="display mt-6 text-5xl leading-[1] font-light md:text-6xl">
              What we <em>do.</em>
            </h2>
            <p className="mt-6 max-w-xs text-ink-soft">
              One small team from idea to launch. No hand-offs, no lost context.
            </p>
          </div>
        </div>

        <ol className="md:col-span-8">
          {services.map((service, i) => (
            <Reveal as="li" key={service.title} delay={i * 60}>
              <div className="group grid gap-4 border-t border-line py-10 transition-colors md:grid-cols-[4rem_1fr_auto] md:gap-8">
                <span className="eyebrow pt-3 text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="display text-4xl font-light transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-lg leading-relaxed text-ink-soft">{service.body}</p>
                </div>
                <ul className="flex flex-wrap content-start gap-2 md:max-w-56 md:justify-end md:pt-3">
                  {service.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-ink-soft">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <li className="border-t border-line" aria-hidden />
        </ol>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className={`${container} scroll-mt-10 py-28 md:py-40`}>
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <SectionLabel index="03">Process</SectionLabel>
          <h2 className="display mt-6 text-5xl leading-[1] font-light md:text-6xl">
            Small team. <em>Clear steps.</em>
          </h2>
        </div>
        <p className="max-w-sm text-ink-soft">
          You always know what we&apos;re doing, why, and what&apos;s next, with a build on your
          phone every week.
        </p>
      </div>

      <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:mt-24 md:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 90} className="bg-bone">
            <div className="group flex h-full flex-col gap-14 p-8 transition-colors duration-500 hover:bg-paper">
              <span className="display text-7xl font-light text-indigo/25 italic transition-colors duration-500 group-hover:text-indigo">
                {i + 1}
              </span>
              <div>
                <h3 className="display text-3xl font-light">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{step.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
