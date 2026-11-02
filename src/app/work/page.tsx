import { Fragment } from "react";
import { PageHero } from "@/components/hero/PageHero";
import { WorkContent } from "@/features/work/WorkContent";
import { WorkExperience } from "@/features/work/WorkExperience";
import { getProjects } from "@/data/projects";
import { JsonLd } from "@/components/common/JsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Work | Gauri Patel (Gxuri), Full Stack Developer",
  alternates: { canonical: "/work" },
  description:
    "Work by Gauri Patel (Gxuri): Front End Developer at Inventive Rhino, plus AI RepoPilot, AI Terminal Agent and more, with live demos and code.",
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <div data-page="work" className="portfolio-route flex flex-col w-full">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          url: `${SITE_URL}/work`,
          name: "Work by Gauri Patel (Gxuri)",
          author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Gauri Patel", url: SITE_URL },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.title,
              url: p.slug ? `${SITE_URL}/work/${p.slug}` : p.repo,
            })),
          },
        }}
      />
      <PageHero
        eyebrow="Selected works"
        title={[
          "Interfaces built",
          <Fragment key="line-1">
            with <em>quiet precision</em>
          </Fragment>,
        ]}
        lede="AI agents, production websites and the tools I build along the way, each with its live site and source code."
        skyFocus="left 40%"
      />
      <WorkExperience />
      <WorkContent projects={projects} />
    </div>
  );
}
