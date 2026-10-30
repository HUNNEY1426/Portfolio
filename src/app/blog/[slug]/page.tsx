import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArticleSkeleton } from "@/components/common/ArticleSkeleton";
import { JsonLd } from "@/components/common/JsonLd";
import { SITE_URL } from "@/lib/site";
import { Metadata } from "next";
import { BLOG_POSTS, getAdjacentPosts } from "@/data/blogPosts";
import { BlogPostDetail } from "@/features/blog/BlogPostDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found | Gxuri",
    };
  }

  return {
    title: post.title.length <= 46 ? `${post.title} | Gauri Patel` : post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article", images: [post.cover.src] },
  };
}

/** Reads the URL inside Suspense, so the page shell can show instantly on navigation. */
async function BlogPostContent({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: post.cover.src,
          datePublished: post.published,
          inLanguage: "en",
          url: `${SITE_URL}/blog/${post.slug}`,
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
          articleSection: post.category,
          author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Gauri Patel", url: SITE_URL },
          // The official sources the post is based on.
          citation: post.sources.map((s) => s.url),
        }}
      />
      <BlogPostDetail post={post} {...getAdjacentPosts(post.slug)} />
    </>
  );
}

export default function BlogPostPage({ params }: Props) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}
