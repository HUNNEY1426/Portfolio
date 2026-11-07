import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { BLOG_POSTS } from "@/data/blogPosts";
import { DETAILED_PROJECTS } from "@/data/projects";

/** Every indexable page: the main pages, each blog post and each project. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/resume`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/connect`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.published,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const projects: MetadataRoute.Sitemap = DETAILED_PROJECTS.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...posts, ...projects];
}
