"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { MAILTO } from "@/data/profile";
import type { BlogPost } from "@/data/blogPosts";
import { ScrambleText } from "@/components/common/ScrambleText";

interface BlogPostDetailProps {
  post: BlogPost;
  newer: BlogPost | null;
  older: BlogPost | null;
}

const NAV_CARD =
  "group flex flex-col gap-1 rounded-2xl border border-hairline-border dark:border-white/10 bg-surface-container-low/70 dark:bg-surface-container-low/80 p-4 sm:p-5 transition-colors hover:border-accent/40";

/** Renders `inline code` spans inside a paragraph. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={i} className="rounded bg-surface-container-low px-1.5 py-0.5 font-mono text-[0.85em] text-on-surface">
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function BlogPostDetail({ post, newer, older }: BlogPostDetailProps) {
  return (
    <article data-editorial-rule className="railed relative w-full min-h-screen pt-28 pb-12 md:pb-20 text-foreground">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-10 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between font-mono text-xs sm:text-sm text-on-surface-variant"
        >
          <Link href="/blog" className="inline-flex items-center gap-1.5 hover:text-on-surface transition-colors py-1 group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>All posts</span>
          </Link>
          {post.externalLink && (
            <a
              href={post.externalLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-on-surface transition-colors py-1"
            >
              <span>{post.externalLink.label}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          )}
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          <ScrambleText as="p" className="font-mono text-xs uppercase tracking-[0.14em] text-accent" text={post.category} trigger="intro" />
          <ScrambleText
            as="h1"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-on-surface leading-[1.1]"
            text={post.title}
            trigger="intro"
            delay={150}
          />
          <p className="font-body text-base sm:text-lg leading-relaxed text-on-surface-variant">{post.excerpt}</p>
          <div className="flex items-center gap-3 font-mono text-xs text-muted-subtle">
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>
        </motion.header>

        <motion.figure
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="m-0 flex flex-col gap-2"
        >
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-hairline-border dark:border-white/10 bg-surface-container-low">
            <Image src={post.cover.src} alt={post.cover.alt} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>
          <figcaption className="font-mono text-[11px] text-muted-subtle text-right">
            Photo:{" "}
            <a href={post.cover.creditUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-on-surface">
              {post.cover.credit}
            </a>
          </figcaption>
        </motion.figure>

        <div className="flex flex-col gap-10 md:gap-12">
          {post.sections.map((section, idx) => (
            <motion.section
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              {section.heading && (
                <h2 className="font-display text-2xl sm:text-[1.75rem] font-semibold tracking-tight text-on-surface">{section.heading}</h2>
              )}
              {section.content?.map((p, i) => (
                <p key={i} className="font-body text-base sm:text-[17px] text-on-surface/90 leading-[1.75]">
                  <Inline text={p} />
                </p>
              ))}
              {section.code && (
                <div className="rounded-xl bg-surface-container-low border border-hairline-border dark:border-white/10 overflow-hidden">
                  {section.codeLanguage && (
                    <div className="px-4 py-2 border-b border-hairline-border dark:border-white/10 font-mono text-[11px] uppercase tracking-wider text-muted-subtle">
                      {section.codeLanguage}
                    </div>
                  )}
                  <pre className="p-4 sm:p-5 overflow-x-auto font-mono text-xs sm:text-sm text-on-surface leading-relaxed">
                    <code>{section.code}</code>
                  </pre>
                </div>
              )}
              {section.bullets && (
                <ul className="flex flex-col gap-2.5 font-body text-base sm:text-[16px] text-on-surface/90 leading-relaxed">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent/70">
                      <Inline text={b} />
                    </li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>

        {/* Sources */}
        <section className="flex flex-col gap-3 rounded-2xl border border-hairline-border dark:border-white/10 bg-surface-container-low/60 p-5 sm:p-6">
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-subtle">Sources & further reading</h2>
          <ul className="flex flex-col gap-2">
            {post.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-1.5 font-body text-sm text-on-surface hover:text-accent transition-colors"
                >
                  <span className="underline decoration-hairline-border underline-offset-4 group-hover:decoration-accent">{s.label}</span>
                  <ExternalLink className="mt-0.5 w-3.5 h-3.5 shrink-0 opacity-60" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        {(newer || older) && (
          <nav aria-label="More posts" className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-8 border-t border-hairline-border dark:border-white/10">
            {newer ? (
              <Link href={`/blog/${newer.slug}`} className={NAV_CARD}>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-subtle">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" /> Newer
                </span>
                <span className="font-sans text-base sm:text-lg font-semibold text-on-surface">{newer.title}</span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {older && (
              <Link href={`/blog/${older.slug}`} className={`${NAV_CARD} sm:items-end sm:text-right`}>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-subtle">
                  Older <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </span>
                <span className="font-sans text-base sm:text-lg font-semibold text-on-surface">{older.title}</span>
              </Link>
            )}
          </nav>
        )}

        <div className="flex items-center justify-between font-mono text-xs sm:text-sm text-on-surface-variant">
          <Link href="/blog" className="inline-flex items-center gap-1.5 hover:text-on-surface transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to all posts
          </Link>
          <a href={MAILTO} className="hover:text-on-surface transition-colors">
            Discuss on email ↗
          </a>
        </div>
      </div>
    </article>
  );
}
