import type { ReactNode } from "react";
import { ArrowUpRight, Download, GraduationCap, Laptop, Wrench } from "lucide-react";
import { FadeUp } from "@/components/hero/RevealLines";
import { GithubIcon } from "@/components/common/BrandIcons";
import { ContributionGraph } from "@/components/common/ContributionGraph";
import { PROFILE } from "@/data/profile";
import { RESUME } from "@/data/resume";
import { HARDWARE, SOFTWARE } from "@/data/uses";
import type { Project } from "@/data/projects";
import { ProjectList } from "@/features/work/ProjectList";
import { CopyResumeButton } from "./CopyResumeButton";
import { ScrambleText } from "@/components/common/ScrambleText";

const PILL =
  "inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-hairline-border dark:border-white/10 font-mono text-xs font-semibold transition-colors";

/** Plain-text version of the résumé, for "Copy as text". */
function asText() {
  const lines = [
    `${PROFILE.name} | ${RESUME.headline}`,
    `${PROFILE.location} | ${PROFILE.email} | ${PROFILE.github.url} | ${PROFILE.linkedin.url} | ${PROFILE.x.url}`,
    "",
    "SUMMARY",
    RESUME.summary,
    "",
    "EXPERIENCE",
    ...RESUME.experience.flatMap((e) => [`${e.role}, ${e.company} (${e.location}) ${e.period}`, ...e.points.map((p) => `- ${p}`), ""]),
    "PROJECTS",
    ...RESUME.projects.flatMap((p) => [`${p.title}: ${p.subtitle}`, `Tech: ${p.tech}`, ...p.points.map((x) => `- ${x}`), ""]),
    "SKILLS",
    ...RESUME.skills.map((s) => `${s.group}: ${s.items}`),
    "",
    "EDUCATION",
    ...RESUME.education.map((e) => `${e.degree}, ${e.school} (${e.location}) ${e.period}`),
  ];
  return lines.join("\n");
}

const CARD = "rounded-2xl border border-hairline-border dark:border-white/10 bg-surface-container-low/70 dark:bg-surface-container-low/80 p-5 sm:p-6 shadow-sm";

function CardTitle({ icon, children }: { icon: ReactNode; children: string }) {
  return (
    <h2 className="mb-4 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-subtle">
      <span className="text-on-surface" aria-hidden="true">{icon}</span>
      <ScrambleText text={children} />
    </h2>
  );
}

/**
 * The résumé: two actions (download the PDF, copy as plain text) above an
 * embedded preview of the PDF on Google Drive, then a bento grid
 * (education, setup, tools, GitHub activity) and the project index.
 */
export function ResumeContent({ projects }: { projects: Project[] }) {
  return (
    <div data-editorial-rule id="resume" className="railed w-full flex flex-col items-center py-16 sm:py-24">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6">
        <FadeUp delay={0} className="flex flex-wrap items-center justify-center gap-2">
          <a href={PROFILE.resumePdf} download className={`${PILL} bg-primary text-on-primary border-transparent hover:opacity-90`}>
            <Download className="w-3.5 h-3.5" aria-hidden="true" /> Download PDF
          </a>
          <CopyResumeButton text={asText()} className={`${PILL} bg-surface-container-low text-on-surface hover:bg-surface-container`} />
        </FadeUp>

        <FadeUp delay={0.1} className="w-full">
          {/* The frame keeps the shape of an A4 page; the preview fills it. */}
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-hairline-border dark:border-white/10 bg-surface shadow-sm"
            style={{ aspectRatio: "1 / 1.414" }}
          >
            <iframe
              src={PROFILE.resumePreview}
              title={`${PROFILE.name} résumé`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allow="autoplay"
            />
          </div>
        </FadeUp>
      </div>

      <div className="w-full max-w-4xl mx-auto mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Education */}
        <FadeUp delay={0} className={`md:col-span-3 ${CARD}`}>
          <CardTitle icon={<GraduationCap className="w-4 h-4" />}>Education</CardTitle>
          <ul className="flex flex-col gap-4">
            {RESUME.education.map((e) => (
              <li key={e.degree} className="flex flex-col gap-0.5">
                <span className="font-body text-[15px] font-semibold text-on-surface">{e.degree}</span>
                <span className="font-body text-sm text-on-surface-variant">{e.school}</span>
                <span className="font-mono text-[11px] text-muted-subtle">
                  {e.location} · {e.period}
                </span>
              </li>
            ))}
          </ul>
        </FadeUp>

        {/* Setup */}
        <FadeUp delay={0.06} className={`md:col-span-3 ${CARD}`}>
          <CardTitle icon={<Laptop className="w-4 h-4" />}>My setup</CardTitle>
          <ul className="flex flex-col divide-y divide-hairline-border dark:divide-white/10">
            {HARDWARE.map((h) => (
              <li key={h.name}>
                <a
                  href={h.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-3 py-2.5 first:pt-0"
                >
                  <span className="flex flex-col">
                    <span className="font-body text-[15px] font-semibold text-on-surface group-hover:text-accent transition-colors">{h.name}</span>
                    <span className="font-mono text-[11px] text-muted-subtle">{h.detail}</span>
                  </span>
                  <ArrowUpRight className="mt-1 w-3.5 h-3.5 shrink-0 text-muted-subtle group-hover:text-accent transition-colors" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </FadeUp>

        {/* Tools */}
        <FadeUp delay={0.12} className={`md:col-span-6 ${CARD}`}>
          <CardTitle icon={<Wrench className="w-4 h-4" />}>Tools I use daily</CardTitle>
          <ul className="flex flex-wrap gap-2">
            {SOFTWARE.map((t) => (
              <li key={t.name}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-hairline-border dark:border-white/10 bg-surface/70 px-3.5 py-1.5 hover:border-accent/50 transition-colors"
                >
                  <span className="font-body text-sm font-semibold text-on-surface group-hover:text-accent transition-colors">{t.name}</span>
                  <span className="font-mono text-[11px] text-muted-subtle">{t.detail}</span>
                </a>
              </li>
            ))}
          </ul>
        </FadeUp>

        {/* GitHub activity */}
        <FadeUp delay={0.18} className={`md:col-span-6 ${CARD}`}>
          <CardTitle icon={<GithubIcon className="w-4 h-4" />}>GitHub activity</CardTitle>
          <ContributionGraph />
        </FadeUp>
      </div>

      {/* Projects: each row opens its own page, with Previous / Next between them. */}
      <div className="w-full max-w-4xl mx-auto mt-16 sm:mt-24">
        <ProjectList projects={projects} heading="Work" />
      </div>
    </div>
  );
}
