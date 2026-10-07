import type { LegalSection } from "./apps";

// Site-wide content. Edit here, not in the components.

export const site = {
  name: "OMR",
  url: "https://omrbrand.com",
  email: "contact@omrbrand.com",
  whatsapp: "https://wa.me/2348064461872?text=Hello%20OMR",
  legalUpdated: "7 October 2026",
};

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/start", label: "Contact" },
];

export const services = [
  {
    title: "Mobile apps",
    body: "iOS and Android apps that feel native, work offline and are ready for the stores on day one.",
    tags: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    title: "Websites",
    body: "Marketing sites and web apps that load fast, read well and are simple to keep up to date.",
    tags: ["Next.js", "TypeScript", "CMS"],
  },
  {
    title: "Product design",
    body: "Flows, interfaces and the small interactions in between, designed before a line of code is written.",
    tags: ["UX", "UI systems", "Prototypes"],
  },
  {
    title: "Launch & care",
    body: "Store submissions, analytics, updates and long-term maintenance, so the product keeps getting better.",
    tags: ["App Store", "Play Store", "Support"],
  },
];

export const steps = [
  {
    title: "Listen",
    body: "We start with the people who'll use it: what they need, and what they'll never miss.",
  },
  {
    title: "Shape",
    body: "Flows and interfaces, refined until each screen has one clear job.",
  },
  {
    title: "Build",
    body: "Typed, tested and reviewed. Weekly builds you can hold in your hand.",
  },
  {
    title: "Ship & care",
    body: "We handle launch, then stay on for the updates that keep it sharp.",
  },
];

/** Options for the start-a-project form. */
export const projectTypes = ["Mobile app", "Website", "App + website", "Design only", "Not sure yet"];
export const timelines = ["ASAP", "1 to 3 months", "3 to 6 months", "Flexible"];

export const sitePrivacy: LegalSection[] = [
  {
    title: "Overview",
    body: [
      "This policy covers omrbrand.com (\"the website\"), run by OMR (\"we\", \"us\"). Each of our apps has its own privacy policy, linked from its page.",
    ],
  },
  {
    title: "What we collect",
    body: [
      "We only collect what you choose to send us. When you use the start-a-project form or email us, we receive:",
      [
        "Your name and email address",
        "Your company, if you add it",
        "Your project details and timeline",
      ],
      "The website does not use cookies for tracking or advertising.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "We use your details only to reply to you and to discuss your project. We don't sell or rent your information, and we don't add you to mailing lists without asking.",
    ],
  },
  {
    title: "Where it's stored",
    body: [
      "Form submissions are delivered to our email inbox. Our hosting and email providers process this data on our behalf.",
    ],
  },
  {
    title: "How long we keep it",
    body: [
      "We keep enquiries for as long as we're in conversation with you, and for up to two years afterwards unless you ask us to delete them sooner.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You can ask to see, correct or delete the information we hold about you at any time. Email us and we'll respond within 30 days.",
    ],
  },
  {
    title: "Contact",
    body: ["Questions about privacy? Email contact@omrbrand.com."],
  },
];

export const siteTerms: LegalSection[] = [
  {
    title: "About these terms",
    body: [
      "These terms apply to your use of omrbrand.com. Each of our apps has its own terms, linked from its page. Client projects are covered by a separate written agreement.",
    ],
  },
  {
    title: "Using the website",
    body: [
      "You're welcome to browse and share the website. Please don't misuse it, for example by trying to disrupt it, gain unauthorised access, or send spam through the contact form.",
    ],
  },
  {
    title: "Our content",
    body: [
      "Text, design, code, images and logos on this website belong to OMR or are used with permission. Please don't reuse them without asking.",
    ],
  },
  {
    title: "Enquiries",
    body: [
      "Sending us a project enquiry doesn't create a contract or any obligation on either side. Any work we do together will be agreed in writing first.",
    ],
  },
  {
    title: "No warranty",
    body: [
      "We keep the website accurate and available, but it is provided \"as is\" and we can't guarantee it will always be error-free.",
    ],
  },
  {
    title: "Changes and law",
    body: [
      "We may update these terms; the date above shows the latest version. These terms are governed by the laws of the Federal Republic of Nigeria.",
    ],
  },
  {
    title: "Contact",
    body: ["Questions? Email contact@omrbrand.com."],
  },
];
