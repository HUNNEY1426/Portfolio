import { PROFILE } from "@/data/profile";
import type { Project } from "@/data/projects";
import { ProjectList } from "./ProjectList";

export function WorkContent({ projects }: { projects: Project[] }) {
  return (
    <section
      data-editorial-rule
      className="railed relative w-full flex flex-col items-center py-20 sm:py-24 overflow-hidden"
      id="work"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
        <ProjectList projects={projects} />

        <a
          href={PROFILE.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 px-6 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container dark:hover:bg-surface-container-high text-on-surface font-mono text-label-code font-semibold transition-all duration-300 flex items-center gap-2 border border-hairline-border dark:border-white/10 shadow-sm hover:scale-[1.015] cursor-pointer group"
        >
          <span>All repositories on GitHub</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}
