import { PROFILE } from "@/data/profile";
import { SITE_UPDATED, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/common/JsonLd";
import { HeroSection } from "@/features/home/HeroSection";
import { AboutSection } from "@/features/home/AboutSection";
import { ExperienceSection } from "@/features/home/ExperienceSection";
import { TechStackSection } from "@/features/home/TechStackSection";
import { GithubActivitySection } from "@/features/home/GithubActivitySection";
import { RecentBlogsSection } from "@/features/home/RecentBlogsSection";
import { QuoteSection } from "@/features/home/QuoteSection";

/**
 * Structured data: who this site is about (Person) and the site itself
 * (WebSite). The same name, title and profile links are used everywhere,
 * so search and AI engines can match Gauri across LinkedIn, GitHub and X.
 */
const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: PROFILE.name,
    alternateName: PROFILE.handle,
    jobTitle: "Full Stack Developer",
    url: SITE_URL,
    image: `${SITE_URL}/assets/gauri-pastel-hd.png`,
    email: `mailto:${PROFILE.email}`,
    worksFor: { "@type": "Organization", name: "Inventive Rhino Pvt. Ltd.", url: "https://inventiverhino.com" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Hemchandracharya North Gujarat University" },
    sameAs: [PROFILE.github.url, PROFILE.linkedin.url, PROFILE.x.url],
    description:
      "Full stack developer with 2 years building production apps in Next.js, React, TypeScript, Tailwind CSS, Zustand and Prisma: admin dashboards, secure authentication and AI agents.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Prisma",
      "Zustand",
      "REST APIs",
      "Role-based access control",
      "Retrieval-augmented generation",
      "Web performance",
      "Accessibility",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Gauri Patel (Gxuri)",
    inLanguage: "en",
    dateModified: SITE_UPDATED.iso,
    author: { "@id": `${SITE_URL}/#person` },
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full relative">
      <JsonLd data={STRUCTURED_DATA} />
      {/* The hero sky runs on into the About section and dissolves there. */}
      <HeroSection />

      {/* Everything below sits on one surface, divided by dashed rules. */}
      <div data-sections>
        <AboutSection />
        <ExperienceSection />
        <TechStackSection />
        <GithubActivitySection />
        <RecentBlogsSection />
        <QuoteSection />
      </div>
    </div>
  );
}
