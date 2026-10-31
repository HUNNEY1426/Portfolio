import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Geist_Mono, Caveat } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PreferencesProvider } from "@/context/PreferencesContext";
import { FloatingController } from "@/components/common/FloatingController";
import { Preloader } from "@/components/common/Preloader";
import { getCurrentYear } from "@/lib/year";
import { SITE_URL } from "@/lib/site";
import { Analytics } from "@/components/common/Analytics";
import "./globals.css";

/* -------------------------------------------------------------------------- */
/*                                   Fonts                                    */
/* -------------------------------------------------------------------------- */

/** Editorial display face — headlines, numerals, statements. */
const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

/** UI / body face — prose, controls, metadata. */
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

/** Technical face — labels, code, tabular data. */
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Handwritten face — the signature and the script eyebrows. */
const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
});

/* -------------------------------------------------------------------------- */
/*                                Theme boot                                  */
/* -------------------------------------------------------------------------- */

/**
 * Applies the persisted theme before first paint so returning dark-mode
 * visitors never see a light flash. Mirrors the storage contract in
 * `PreferencesContext`.
 */
const THEME_BOOT = `(function(){try{var s=localStorage.getItem('gxuri_pref_system_theme'),t=localStorage.getItem('gxuri_pref_theme'),l=localStorage.getItem('gxuri_pref_labels'),d=s==='on'?window.matchMedia('(prefers-color-scheme: dark)').matches:t==='dark';var r=document.documentElement;r.style.colorScheme=d?'dark':'light';if(d){r.classList.add('dark');}r.setAttribute('data-show-labels',l===null?'true':l);}catch(e){}})();`;

const SITE_TITLE = "Gauri Patel (Gxuri) | Full Stack Developer";

const SITE_DESCRIPTION =
  "Gauri Patel (Gxuri) is a full stack developer in Ahmedabad, India with 2 years building production web apps in Next.js, React, TypeScript and Prisma.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  keywords: [
    "Gauri Patel",
    "Gxuri",
    "full stack developer",
    "full stack developer Ahmedabad",
    "Next.js developer",
    "React developer",
    "TypeScript developer",
    "web developer Gujarat",
  ],
  authors: [{ name: "Gauri Patel", url: SITE_URL }],
  creator: "Gauri Patel",
  // Explicitly indexable, with full snippets and large previews allowed:
  // these are what make a page eligible for AI Overviews and rich results.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  // Google Search Console ownership check (set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION).
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Gauri Patel (Gxuri)",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@Honney___1426",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4f1" },
    { media: "(prefers-color-scheme: dark)", color: "#07050e" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resolved on the server so the client never reads the clock during render.
  const year = await getCurrentYear();

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
      // Lets Next.js pause smooth scrolling while it changes pages.
      data-scroll-behavior="smooth"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-body text-on-background selection:bg-primary selection:text-on-primary">
        <PreferencesProvider>
          <Preloader />
          <Navbar />
          {/* Rails: a hairline either side of the centred content column,
              starting below the hero. */}
          <div className="site-shell">
            <main className="site-main">{children}</main>
            <SiteFooter year={year} />
          </div>
          <FloatingController />
          <Analytics />
        </PreferencesProvider>
      </body>
    </html>
  );
}
