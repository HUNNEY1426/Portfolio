import { FadeUp } from "@/components/hero/RevealLines";
import { ContributionGraph } from "@/components/common/ContributionGraph";
import { ScrambleText } from "@/components/common/ScrambleText";

/** Home: the last year of real GitHub activity, the same panel as on the résumé. */
export function GithubActivitySection() {
  return (
    <section className="relative w-full flex flex-col items-center py-20 sm:py-28" id="activity">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
        <FadeUp delay={0} className="flex justify-center mb-8">
          <div className="section-pill inline-flex items-center px-4 py-1.5 rounded-full bg-surface-container-low border border-hairline-border dark:border-white/10 shadow-sm">
            <ScrambleText as="h2" className="font-mono text-xs uppercase tracking-wider font-semibold text-on-surface" text="GitHub Activity" />
          </div>
        </FadeUp>
        <ContributionGraph />
      </div>
    </section>
  );
}
