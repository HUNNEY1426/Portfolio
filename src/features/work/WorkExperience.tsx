import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeUp } from "@/components/hero/RevealLines";
import { ScrambleText } from "@/components/common/ScrambleText";
import { TechIcon } from "@/components/common/TechIcon";
import { RESUME } from "@/data/resume";

/** The stack used in the role, shown as logo tags. */
const ROLE_TECH = ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Prisma", "REST APIs", "JWT", "OAuth", "RBAC"];

/**
 * Work: professional experience, with what was built in the role. The
 * write-up comes from the résumé data, so the two never drift apart.
 */
export function WorkExperience() {
  return (
    <section data-editorial-rule className="railed relative w-full flex flex-col items-center py-20 sm:py-24" id="experience">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
        <FadeUp delay={0} className="flex justify-center mb-8">
          <div className="section-pill inline-flex items-center px-4 py-1.5 rounded-full bg-surface-container-low border border-hairline-border dark:border-white/10 shadow-sm">
            <ScrambleText as="h2" className="font-mono text-xs uppercase tracking-wider font-semibold text-on-surface" text="Experience" />
          </div>
        </FadeUp>

        {RESUME.experience.map((job) => (
          <FadeUp key={job.company + job.role} delay={0.1} className="w-full">
            <article className="w-full rounded-2xl border border-hairline-border/80 dark:border-white/10 bg-surface-container-low/70 dark:bg-surface-container-low/80 p-5 sm:p-8 shadow-sm flex flex-col gap-6">
              <header className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <ScrambleText as="h3" className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-on-surface" text={job.role} />
                  <span className="font-mono text-xs sm:text-sm text-muted-subtle shrink-0">{job.period}</span>
                </div>
                <p className="font-body text-sm sm:text-base text-on-surface-variant">
                  <a
                    href="https://inventiverhino.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-on-surface hover:text-accent transition-colors"
                  >
                    {job.company}
                  </a>
                  <span className="text-muted-subtle"> · {job.location}</span>
                </p>
              </header>

              <div className="flex flex-col gap-3">
                <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-subtle">What I built</h4>
                <ul className="flex flex-col gap-2.5 font-body text-[15px] sm:text-base leading-relaxed text-on-surface-variant">
                  {job.points.map((p) => (
                    <li key={p} className="relative pl-5 before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent/70">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-subtle">Stack</h4>
                <ul className="flex flex-wrap gap-2">
                  {ROLE_TECH.map((t) => (
                    <li
                      key={t}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline-border dark:border-white/10 bg-surface/60 font-mono text-[11px] text-on-surface"
                    >
                      <TechIcon name={t} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-hairline-border dark:border-white/10 font-mono text-xs">
                <Link href="/work/inventive-rhino" className="inline-flex items-center gap-1.5 text-on-surface hover:text-accent transition-colors">
                  The company website I built →
                </Link>
                <a
                  href="https://inventiverhino.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-on-surface-variant hover:text-accent transition-colors"
                >
                  inventiverhino.com <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
