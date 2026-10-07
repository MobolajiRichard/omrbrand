"use server";

import nodemailer from "nodemailer";
import { site } from "../lib/site";

export type EnquiryState = {
  status: "idle" | "sent" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "type" | "details", string>>;
  values?: Record<string, string>;
};

const FIELDS = ["name", "email", "company", "type", "timeline", "details"] as const;

function transport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) return null;
  // Defaults to Gmail (with an app password) when no SMTP host is given.
  return SMTP_HOST
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT ?? 465),
        secure: Number(SMTP_PORT ?? 465) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : nodemailer.createTransport({ service: "gmail", auth: { user: SMTP_USER, pass: SMTP_PASS } });
}

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const values = Object.fromEntries(
    FIELDS.map((key) => [key, String(formData.get(key) ?? "").trim().slice(0, 5000)]),
  ) as Record<(typeof FIELDS)[number], string>;

  // Honeypot: real people never see this field.
  if (formData.get("website")) return { status: "sent" };

  const errors: EnquiryState["errors"] = {};
  if (!values.name) errors.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Please enter a valid email.";
  if (!values.type) errors.type = "Pick the closest option.";
  if (values.details.length < 20) errors.details = "A sentence or two helps us reply properly.";
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const mailer = transport();
  if (!mailer) {
    return {
      status: "error",
      message: `Our form isn't connected yet. Please email us at ${site.email}.`,
      values,
    };
  }

  try {
    await mailer.sendMail({
      from: `"OMR website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      replyTo: `"${values.name.replace(/"/g, "")}" <${values.email}>`,
      subject: `New project: ${values.type} from ${values.name}`,
      text: [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Company: ${values.company || "-"}`,
        `Project: ${values.type}`,
        `Timeline: ${values.timeline || "-"}`,
        "",
        values.details,
      ].join("\n"),
    });
    return { status: "sent" };
  } catch (error) {
    console.error("Enquiry email failed", error);
    return {
      status: "error",
      message: `Something went wrong sending your message. Please try again, or email ${site.email}.`,
      values,
    };
  }
}
