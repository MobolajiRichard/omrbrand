"use client";

import { useActionState } from "react";
import { projectTypes, timelines } from "../lib/site";
import { type EnquiryState, sendEnquiry } from "./actions";

const field =
  "w-full border-b border-paper/20 bg-transparent py-3 text-lg text-paper placeholder:text-paper/30 outline-none transition-colors focus:border-indigo-soft";

function Chips({
  name,
  options,
  value,
  required,
}: {
  name: string;
  options: string[];
  value?: string;
  required?: boolean;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map((option) => (
        <label
          key={option}
          className="cursor-pointer rounded-full border border-paper/20 px-4 py-2 text-sm text-paper/70 transition-colors hover:border-paper/50 has-checked:border-indigo-soft has-checked:bg-indigo-soft has-checked:text-ink has-focus-visible:outline-2 has-focus-visible:outline-indigo-soft"
        >
          <input
            type="radio"
            name={name}
            value={option}
            defaultChecked={value === option}
            required={required}
            className="sr-only"
          />
          {option}
        </label>
      ))}
    </div>
  );
}

function Label({ children, error }: { children: React.ReactNode; error?: string }) {
  return (
    <span className="eyebrow flex justify-between gap-4 text-paper/50">
      {children}
      {error && <span className="normal-case tracking-normal text-[#ff9b8a]">{error}</span>}
    </span>
  );
}

export function StartForm() {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, {
    status: "idle",
  });

  if (state.status === "sent") {
    return (
      <div className="py-16 text-center">
        <p className="display text-6xl text-indigo-soft italic">Thank you.</p>
        <p className="mx-auto mt-6 max-w-sm text-paper/70">
          Your message is on its way. We&apos;ll read it and reply right away.
        </p>
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={action} className="space-y-9" noValidate>
      <div className="grid gap-9 sm:grid-cols-2">
        <label className="block">
          <Label error={e.name}>Your name</Label>
          <input name="name" autoComplete="name" defaultValue={v.name} className={field} placeholder="Ada Okafor" />
        </label>
        <label className="block">
          <Label error={e.email}>Email</Label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={v.email}
            className={field}
            placeholder="ada@company.com"
          />
        </label>
      </div>

      <label className="block">
        <Label>Company (optional)</Label>
        <input name="company" autoComplete="organization" defaultValue={v.company} className={field} placeholder="Where you work, if anywhere" />
      </label>

      <fieldset>
        <legend className="w-full">
          <Label error={e.type}>What are we making?</Label>
        </legend>
        <Chips name="type" options={projectTypes} value={v.type} />
      </fieldset>

      <fieldset>
        <legend className="w-full">
          <Label>Timeline</Label>
        </legend>
        <Chips name="timeline" options={timelines} value={v.timeline} />
      </fieldset>

      <label className="block">
        <Label error={e.details}>Tell us about it</Label>
        <textarea
          name="details"
          rows={4}
          defaultValue={v.details}
          className={`${field} resize-none`}
          placeholder="Who it's for, what it should do, and where you are with it."
        />
      </label>

      {/* Honeypot for bots; hidden from people and screen readers. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      {state.message && <p className="rounded-2xl bg-[#ff9b8a]/10 px-5 py-4 text-sm text-[#ffc2b8]">{state.message}</p>}

      <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
        <p className="max-w-xs text-xs text-paper/40">
          We only use your details to reply. See our{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-paper">
            privacy policy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 text-ink transition-colors hover:bg-indigo-soft disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send enquiry"}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </form>
  );
}
