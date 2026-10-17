import type { ReactNode } from "react";
import { Sky } from "./Sky";
import { FadeUp, Handwrite, RevealLines } from "./RevealLines";
import { ScrollFade } from "./HeroScroll";
import { ScrambleText } from "@/components/common/ScrambleText";

interface PageHeroProps {
  /** Handwritten eyebrow above the headline. */
  eyebrow: string;
  /** Headline, one entry per line. Wrap a phrase in <em> for the italic accent. */
  title: ReactNode[];
  /** One line under the title; it is written in with the decode effect. */
  lede?: string;
  /** Which part of the sky this page looks at (CSS background-position). */
  skyFocus?: string;
}

/**
 * The inner-page hero: a full-screen, full-width sky with the title centred
 * on it. The title lifts away as you scroll, and the sky runs on into the
 * next section and dissolves there.
 */
export function PageHero({ eyebrow, title, lede, skyFocus }: PageHeroProps) {
  return (
    <section className="page-hero">
      <Sky focus={skyFocus} />
      <ScrollFade className="hero-intro">
        <Handwrite delay={0.05} className="page-hero-eyebrow">
          {eyebrow}
        </Handwrite>
        <h1 className="page-hero-title">
          <RevealLines lines={title} delay={0.12} />
        </h1>
        {lede && (
          <FadeUp delay={0.3}>
            <ScrambleText as="p" className="page-hero-lede" text={lede} trigger="intro" delay={550} />
          </FadeUp>
        )}
      </ScrollFade>
    </section>
  );
}
