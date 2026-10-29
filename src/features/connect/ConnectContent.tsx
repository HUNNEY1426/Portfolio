"use client";

import { Mail, ArrowUpRight, Clock, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { GithubIcon } from "@/components/common/BrandIcons";
import { MAILTO, PROFILE } from "@/data/profile";
import { ScrambleText } from "@/components/common/ScrambleText";

const CARD = "bg-surface-container-lowest border border-hairline-border rounded-2xl shadow-sm";
const TILE =
  "p-3.5 bg-surface-container-low hover:bg-surface-container-high border border-hairline-border rounded-xl flex flex-col justify-between transition-colors group";

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.1 22H3l7.3-8.3L1 2h6.4l4.4 5.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm7 0h3.8v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.55 4.78 5.87v5.58h-4v-4.95c0-1.18-.02-2.7-1.7-2.7-1.7 0-1.95 1.3-1.95 2.62v5.03H10v-11Z" />
    </svg>
  );
}

export function ConnectContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      data-editorial-rule
      className="railed connect-route w-full flex flex-col py-16 sm:py-24 z-10"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-space-xl">
        <section id="channels" className="w-full flex flex-col gap-4 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Email */}
            <div className={`lg:col-span-8 ${CARD} p-6 sm:p-8 flex flex-col justify-between min-h-[260px]`}>
              <div className="inline-flex w-fit items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full border border-hairline-border text-[11px] text-on-surface-variant font-medium">
                <Mail className="w-3.5 h-3.5" />
                <ScrambleText text="Email" />
              </div>
              <div className="my-6">
                <p className="font-body text-body-sm text-on-surface-variant mb-1 font-medium">Send a brief or a question directly</p>
                <a
                  href={MAILTO}
                  className="inline-flex flex-wrap items-center gap-1.5 font-sans text-2xl sm:text-headline-md md:text-[2.4rem] font-bold text-on-surface hover:opacity-75 tracking-tight transition-all break-all"
                >
                  <span>{PROFILE.email}</span>
                  <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className={`lg:col-span-4 ${CARD} p-6 sm:p-7 flex flex-col justify-between gap-6`}>
              <div>
                <div className="w-8 h-8 rounded-lg bg-surface-container-low border border-hairline-border flex items-center justify-center text-on-surface mb-6">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <ScrambleText className="font-mono text-[11px] uppercase tracking-wider text-muted-subtle block mb-1 font-semibold" text="LinkedIn" />
                <ScrambleText as="h2" className="font-sans text-headline-sm text-on-surface tracking-tight mb-2 font-bold" text="Let’s connect" />
                <p className="font-body text-body-sm text-on-surface-variant leading-relaxed font-medium">
                  Roles, collaborations and the work behind them.
                </p>
              </div>
              <a
                href={PROFILE.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-surface-container-low hover:bg-surface-container-high text-on-surface rounded-xl font-mono text-[11px] font-bold tracking-wider flex items-center justify-center gap-1.5 border border-hairline-border transition-all"
              >
                <span>OPEN LINKEDIN</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Social and code */}
            <div className={`lg:col-span-6 ${CARD} p-5 sm:p-6 flex flex-col gap-4`}>
              <ScrambleText className="font-mono text-[11px] uppercase tracking-wider text-muted-subtle font-semibold" text="Elsewhere" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                <a href={PROFILE.x.url} target="_blank" rel="noopener noreferrer" className={TILE}>
                  <div className="flex items-center justify-between mb-3">
                    <XIcon className="w-4 h-4 text-on-surface-variant" />
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-subtle group-hover:text-on-surface transition-colors" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-muted-subtle block font-medium">X</span>
                    <span className="font-mono text-label-code font-bold text-on-surface tracking-tight break-all">@{PROFILE.x.user}</span>
                  </div>
                </a>
                <a href={PROFILE.github.url} target="_blank" rel="noopener noreferrer" className={TILE}>
                  <div className="flex items-center justify-between mb-3">
                    <GithubIcon className="w-4 h-4 text-on-surface-variant" />
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-subtle group-hover:text-on-surface transition-colors" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-muted-subtle block font-medium">GitHub</span>
                    <span className="font-mono text-label-code font-bold text-on-surface tracking-tight">@{PROFILE.github.user}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Working style */}
            <div className={`lg:col-span-6 ${CARD} p-5 sm:p-6 flex flex-col justify-between gap-4`}>
              <ScrambleText className="font-mono text-[11px] uppercase tracking-wider text-muted-subtle font-semibold" text="Working style" />
              <div className="flex flex-col gap-2">
                <div className="p-2.5 px-3 bg-surface-container-low border border-hairline-border rounded-xl flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-muted-subtle" />
                  <span className="font-body text-body-sm font-semibold text-on-surface">Remote and async friendly</span>
                </div>
                <div className="p-2.5 px-3 bg-surface-container-low border border-hairline-border rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-muted-subtle" />
                    <span className="font-body text-body-sm font-semibold text-on-surface">{PROFILE.location}</span>
                  </div>
                  <span className="font-mono text-[11px] text-on-surface-variant font-bold">{PROFILE.timezone}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
