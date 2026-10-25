import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FadeUp } from "@/components/hero/RevealLines";
import { GithubIcon } from "@/components/common/BrandIcons";
import { TechIcon } from "@/components/common/TechIcon";
import { MAILTO } from "@/data/profile";
import type { Project } from "@/data/projects";
import { ScrambleText } from "@/components/common/ScrambleText";

const ACTION =
  "inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-hairline-border dark:border-white/10 font-mono text-xs font-semibold transition-colors";

const NAV_CARD =
  "group flex flex-col gap-1 rounded-2xl border border-hairline-border dark:border-white/10 bg-surface-container-low/70 dark:bg-surface-container-low/80 p-4 sm:p-5 transition-colors hover:border-accent/40";

/**
 * A project, laid out like a blog article: back link, title, meta, the
 * write-up, then Previous / Next to move through the other projects.
 */
export function ProjectDetail({ project, previous, next }: { project: Project; previous: Project; next: Project }) {
  return (
    <article data-editorial-rule className="railed relative w-full min-h-screen pt-28 pb-12 md:pb-20">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-10 md:gap-14">
        <FadeUp delay={0} className="flex items-center justify-between font-mono text-xs sm:text-sm text-on-surface-variant">
          <Link href="/work" className="inline-flex items-center gap-1.5 hover:text-on-surface transition-colors py-1 group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            <span>All projects</span>
          </Link>
          <span>{project.year}</span>
        </FadeUp>

        <FadeUp delay={0.08}>
          <header className="flex flex-col gap-4">
            <ScrambleText as="p" className="font-mono text-xs uppercase tracking-[0.14em] text-accent" text={project.subtitle} trigger="intro" />
            <ScrambleText
              as="h1"
              className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-on-surface leading-[1.05]"
              text={project.title}
              trigger="intro"
              delay={150}
            />
            <ScrambleText as="p" className="font-body text-base sm:text-lg leading-relaxed text-on-surface-variant" text={project.summary} trigger="intro" delay={450} />
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className={`${ACTION} bg-primary text-on-primary border-transparent hover:opacity-90`}>
                  Visit live site <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className={`${ACTION} bg-surface-container-low text-on-surface hover:bg-surface-container`}>
                <GithubIcon className="w-3.5 h-3.5" aria-hidden="true" /> View source
              </a>
            </div>
          </header>
        </FadeUp>

        <FadeUp delay={0.16} className="flex flex-col gap-10">
          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-widest text-on-surface-variant">Built with</h2>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline-border dark:border-white/10 bg-surface-container-low font-mono text-[11px] text-on-surface"
                >
                  <TechIcon name={t} />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {project.points.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-widest text-on-surface-variant">What I built</h2>
              <ul className="flex flex-col gap-3 font-body text-[15px] sm:text-base leading-relaxed text-on-surface-variant">
                {project.points.map((p) => (
                  <li key={p} className="relative pl-5 before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent/70">
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </FadeUp>

        {/* Previous / Next through the projects, wrapping around at the ends. */}
        <nav aria-label="More projects" className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-10 border-t border-hairline-border dark:border-white/10">
          <Link href={`/work/${previous.slug}`} className={NAV_CARD}>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-subtle">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" /> Previous
            </span>
            <span className="font-sans text-lg font-semibold text-on-surface">{previous.title}</span>
          </Link>
          <Link href={`/work/${next.slug}`} className={`${NAV_CARD} sm:items-end sm:text-right`}>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-subtle">
              Next <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </span>
            <span className="font-sans text-lg font-semibold text-on-surface">{next.title}</span>
          </Link>
        </nav>

        <div className="flex items-center justify-between font-mono text-xs sm:text-sm text-on-surface-variant">
          <Link href="/work" className="inline-flex items-center gap-1.5 hover:text-on-surface transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" /> Back to all projects
          </Link>
          <a href={MAILTO} className="hover:text-on-surface transition-colors">
            Talk about it ↗
          </a>
        </div>
      </div>
    </article>
  );
}
