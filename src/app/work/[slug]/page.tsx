import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArticleSkeleton } from "@/components/common/ArticleSkeleton";
import { JsonLd } from "@/components/common/JsonLd";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { DETAILED_PROJECTS, getProjectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/features/work/ProjectDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DETAILED_PROJECTS.map((p) => ({ slug: p.slug as string }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = getProjectBySlug(slug);
  if (!found) return { title: "Project not found | Gxuri" };
  return {
    // The most descriptive title that still fits in a search result (~60 characters).
    title: [
      `${found.project.title}: ${found.project.subtitle} | Gauri Patel`,
      `${found.project.title}: ${found.project.subtitle}`,
      `${found.project.title} | Gauri Patel`,
    ].find((t) => t.length <= 60),
    description: found.project.summary,
    alternates: { canonical: `/work/${slug}` },
  };
}

/** Reads the URL inside Suspense, so the page shell can show instantly on navigation. */
async function ProjectContent({ params }: Props) {
  const { slug } = await params;
  const found = getProjectBySlug(slug);
  if (!found) notFound();
  const p = found.project;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: p.title,
          description: p.summary,
          url: `${SITE_URL}/work/${p.slug}`,
          codeRepository: p.repo,
          ...(p.live ? { sameAs: p.live } : {}),
          programmingLanguage: p.tech,
          dateModified: p.year,
          author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Gauri Patel", url: SITE_URL },
        }}
      />
      <ProjectDetail {...found} />
    </>
  );
}

export default function ProjectPage({ params }: Props) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}
