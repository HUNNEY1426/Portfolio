import { Fragment } from "react";
import { PageHero } from "@/components/hero/PageHero";
import { JsonLd } from "@/components/common/JsonLd";
import { SITE_URL } from "@/lib/site";
import { ResumeContent } from "@/features/resume/ResumeContent";
import { getProjects } from "@/data/projects";

export const metadata = {
  title: "Résumé | Gauri Patel, Full Stack Developer",
  alternates: { canonical: "/resume" },
  description:
    "Résumé of Gauri Patel (Gxuri), full stack developer in Ahmedabad: 2 years with Next.js, TypeScript, Tailwind CSS, Zustand and Prisma.",
};

export default async function ResumePage() {
  const projects = await getProjects();

  return (
    <div data-page="resume" className="portfolio-route flex flex-col w-full">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: `${SITE_URL}/resume`,
          name: "Résumé of Gauri Patel",
          mainEntity: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Gauri Patel", url: SITE_URL },
        }}
      />
      <PageHero
        eyebrow="Curriculum vitae"
        title={[
          "Gauri Patel,",
          <Fragment key="line-1">
            <em>Full Stack</em> Developer
          </Fragment>,
        ]}
        lede="Two years building production apps with Next.js, TypeScript and Tailwind CSS, from admin dashboards to AI agents."
        skyFocus="right 35%"
      />
      <ResumeContent projects={projects} />
    </div>
  );
}
