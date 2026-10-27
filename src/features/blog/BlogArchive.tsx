"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { IndexList, type IndexItem } from "@/components/common/IndexList";
import { BLOG_POSTS } from "@/data/blogPosts";

const ITEMS: IndexItem[] = BLOG_POSTS.map((post) => ({
  title: post.title,
  meta: post.category,
  year: post.date,
  href: `/blog/${post.slug}`,
}));

/** How many posts show at first, and how many each "Show more" adds. */
const PAGE = 3;

/**
 * The writing archive, in the same index rows as the work page. The newest
 * posts show first; "Show more" reveals the next batch until all are visible.
 */
export function BlogArchive() {
  const [visible, setVisible] = useState(PAGE);
  const remaining = ITEMS.length - visible;

  return (
    <section
      data-editorial-rule
      id="archive"
      className="railed relative w-full flex flex-col items-center py-20 sm:py-24 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
        <IndexList heading="The archive" items={ITEMS.slice(0, visible)} />

        {remaining > 0 && (
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE)}
            className="mt-10 px-6 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container dark:hover:bg-surface-container-high text-on-surface font-mono text-label-code font-semibold transition-all duration-300 flex items-center gap-2 border border-hairline-border dark:border-white/10 shadow-sm hover:scale-[1.015] cursor-pointer group"
          >
            <span>
              Show more posts <span className="text-muted-subtle">({remaining} more)</span>
            </span>
            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
}
