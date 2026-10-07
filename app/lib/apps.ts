// Every app OMR publishes. Each entry powers /apps/[slug] and its
// privacy, terms and support pages (the URLs used for store submissions).

export type LegalSection = {
  title: string;
  // A string is a paragraph; a string[] is a bulleted list.
  body: (string | string[])[];
};

export type App = {
  slug: string;
  name: string;
  tagline: string;
  /** Short line for cards. */
  summary: string;
  description: string[];
  category: string;
  platforms: string[];
  year: string;
  price: string;
  accent: string;
  glyph: string;
  screens: { src: string; alt: string }[];
  stats: { value: string; label: string }[];
  features: { title: string; body: string }[];
  stack: string[];
  links: { appStore?: string; playStore?: string };
  supportEmail: string;
  faq: { q: string; a: string }[];
  legalUpdated: string;
  privacy: LegalSection[];
  terms: LegalSection[];
};

export const apps: App[] = [
  {
    slug: "unifiedhymnal",
    name: "UnifiedHymnal",
    tagline: "Every hymn. Every denomination. One app.",
    summary:
      "The hymn books of Nigeria's major churches, in four languages, in one calm reader.",
    description: [
      "UnifiedHymnal brings together the hymn books of Nigeria's major Christian denominations, so nobody has to carry three hymnals to church or switch apps in the middle of a service.",
      "Browse Anglican, Methodist, Baptist, CAC, Seraphim, TACN and Catholic hymns in English, Yoruba, Igbo and Hausa. Follow the full Order of Holy Communion in the Liturgy section, and test yourself with a daily round of Church Trivia.",
      "There's no sign-up and there are no ads. Everything works offline, and your favourites stay on your phone.",
    ],
    category: "Music & worship",
    platforms: ["iOS", "Android"],
    year: "2026",
    price: "Free",
    accent: "#7c3aed",
    glyph: "/work/hymnal-glyph.png",
    screens: [
      { src: "/work/hymnal-home.jpg", alt: "UnifiedHymnal home screen with search, languages and denominations" },
      { src: "/work/hymnal-lyrics.jpg", alt: "Reading 'Awake, my soul, and with the sun' in light mode" },
      { src: "/work/hymnal-lyrics-dark.jpg", alt: "A Yoruba CAC hymn with its chorus, in dark mode" },
    ],
    stats: [
      { value: "10,800+", label: "hymns" },
      { value: "7", label: "denominations" },
      { value: "4", label: "languages" },
    ],
    features: [
      {
        title: "Instant search",
        body: "Find any hymn by title or number in a single tap, across every hymnal at once.",
      },
      {
        title: "Your language",
        body: "English, Yoruba, Igbo and Hausa. Browse by language or by denomination.",
      },
      {
        title: "Built for the pew",
        body: "Auto-scroll for hands-free singing, adjustable text size, and light and dark modes.",
      },
      {
        title: "The liturgy, too",
        body: "The full Order of Holy Communion in English, Yoruba and Igbo, ready to follow along.",
      },
      {
        title: "Favourites & history",
        body: "Save the hymns your church sings every week and pick up where you left off.",
      },
      {
        title: "Church Trivia",
        body: "A short daily quiz on the Bible and church history, with a streak to keep.",
      },
    ],
    stack: ["React Native", "Expo", "TypeScript", "NativeWind"],
    links: {
      // TODO: add the App Store URL (apps.apple.com/app/id…) once the listing is live.
      playStore: "https://play.google.com/store/apps/details?id=com.omr.unifiedhymnal",
    },
    supportEmail: "contact@omrbrand.com",
    faq: [
      {
        q: "Do I need an account?",
        a: "No. UnifiedHymnal works straight away, with no sign-up and no login.",
      },
      {
        q: "Does it work without internet?",
        a: "Yes. Every hymn and the liturgy are stored in the app, so it works fully offline.",
      },
      {
        q: "My church's hymnal is missing. Can you add it?",
        a: "We'd love to. Email us with the name of the hymnal and your denomination and we'll look into it.",
      },
      {
        q: "I found a typo in a hymn.",
        a: "Thank you! Email us the hymnal, the hymn number and the correction, and we'll fix it in the next update.",
      },
      {
        q: "How do I delete my data?",
        a: "Everything the app saves (favourites, history, trivia scores and your theme) lives only on your device. Deleting the app removes all of it.",
      },
    ],
    legalUpdated: "7 October 2026",
    privacy: [
      {
        title: "Overview",
        body: [
          "This policy explains how UnifiedHymnal (\"the app\"), published by OMR (\"we\", \"us\"), handles information. The short version: we don't collect any personal information, and the app works without an account.",
        ],
      },
      {
        title: "Information we collect",
        body: [
          "We do not collect, store or transmit any personally identifiable information. The app has no sign-up, no login and no user profiles.",
        ],
      },
      {
        title: "Information stored on your device",
        body: [
          "To remember your preferences, the app saves the following on your device only. It is never sent to us or anyone else:",
          [
            "Your theme preference (light or dark mode)",
            "Hymns you mark as favourites",
            "Hymns you have recently opened",
            "Your Church Trivia results and streak",
          ],
          "This information is deleted when you uninstall the app.",
        ],
      },
      {
        title: "Analytics, advertising and tracking",
        body: [
          "The app contains no advertising and no third-party analytics, advertising or tracking SDKs. We do not track you across other apps or websites.",
        ],
      },
      {
        title: "Services the app relies on",
        body: [
          "The app may check for and download content updates from Expo (expo.dev), the platform it is built on. These requests contain technical information needed to deliver the right update, such as the app version and platform, and are not used to identify you.",
          "The app is distributed through the Apple App Store and Google Play, which may collect information under their own privacy policies.",
          "When you choose to share a hymn or email us, the app hands over to your device's share sheet or mail app. What you send is then handled by the service you choose.",
        ],
      },
      {
        title: "Children",
        body: [
          "UnifiedHymnal is suitable for all ages. Because we collect no personal information, we do not knowingly collect information from children.",
        ],
      },
      {
        title: "Changes to this policy",
        body: [
          "If we change how the app handles information, we will update this page and the date at the top. Significant changes will also be noted in the app's release notes.",
        ],
      },
      {
        title: "Contact",
        body: [
          "Questions about this policy? Email contact@omrbrand.com.",
        ],
      },
    ],
    terms: [
      {
        title: "Agreement",
        body: [
          "These terms apply to your use of the UnifiedHymnal app, published by OMR. By downloading or using the app you agree to them. If you don't agree, please don't use the app.",
        ],
      },
      {
        title: "Using the app",
        body: [
          "UnifiedHymnal is free for personal, church and worship use. You may not:",
          [
            "Copy, resell or redistribute the app or its compiled hymn collection as your own product",
            "Reverse engineer the app except where the law allows it",
            "Use the app in any way that breaks the law or the rules of the store you downloaded it from",
          ],
        ],
      },
      {
        title: "Hymns and liturgy",
        body: [
          "Hymn texts and liturgical material are reproduced to support worship. Rights in individual texts remain with their respective authors, publishers and churches. If you hold the rights to a text and have a concern, email contact@omrbrand.com and we will respond promptly.",
          "We work hard to keep texts accurate, but errors can happen. Please let us know if you find one.",
        ],
      },
      {
        title: "Our content",
        body: [
          "The app's design, code, name and logo belong to OMR. These terms don't give you any rights to them beyond using the app.",
        ],
      },
      {
        title: "Updates and availability",
        body: [
          "We may update, change or discontinue features at any time. We aim to keep the app available, but we can't promise it will always be free of errors or interruptions.",
        ],
      },
      {
        title: "No warranty",
        body: [
          "The app is provided \"as is\". To the fullest extent the law allows, we make no warranties of any kind and are not liable for any indirect or consequential loss arising from your use of it.",
        ],
      },
      {
        title: "App stores",
        body: [
          "If you downloaded the app from the Apple App Store, these terms are between you and OMR, not Apple. Apple has no obligation to provide maintenance or support for the app, and Apple's standard Licensed Application End User License Agreement also applies. The same applies to Google Play and Google.",
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
    ],
  },
];

export function getApp(slug: string) {
  return apps.find((app) => app.slug === slug);
}
