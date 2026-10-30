import { Fragment } from "react";
import { PageHero } from "@/components/hero/PageHero";
import { BlogArchive } from "@/features/blog/BlogArchive";
import { BLOG_POSTS } from "@/data/blogPosts";
import { JsonLd } from "@/components/common/JsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  alternates: { canonical: "/blog" },
  title: "Writing & Research | Gauri Patel (Gxuri)",
  description:
    "Articles by Gauri Patel (Gxuri) on Next.js, TypeScript, modern CSS and AI coding agents: what changed in 2026 and how to use it, with official sources.",
};

export default function BlogPage() {
  return (
    <div data-page="writing" className="portfolio-route flex flex-col w-full">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          url: `${SITE_URL}/blog`,
          name: "Writing by Gauri Patel (Gxuri)",
          author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Gauri Patel", url: SITE_URL },
          blogPost: BLOG_POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.published,
          })),
        }}
      />
      <PageHero
        eyebrow="Field notes"
        title={[
          <Fragment key="line-1">
            Notes on <em>craft</em>,
          </Fragment>,
          "code and motion",
        ]}
        lede="Short, practical writing on interaction design, frontend architecture and the tools behind them."
        skyFocus="center 80%"
      />
      <BlogArchive />
    </div>
  );
}
