import { Fragment } from "react";
import Image from "next/image";
import { Sky } from "@/components/hero/Sky";
import { RevealLines } from "@/components/hero/RevealLines";
import { ScrollFade } from "@/components/hero/HeroScroll";

/**
 * Home hero: a full-screen sky with the greeting centred on it and the
 * portrait rising out of the bottom. The sky carries on into the About
 * section and dissolves there.
 */
export function HeroSection() {
  return (
    <section className="hero-section" id="hero">
      <Sky />

      <div className="hero-portrait-stage" aria-hidden="true">
        <Image
          src="/assets/gauri-pastel-hd.png"
          alt=""
          width={891}
          height={819}
          quality={90}
          preload
          sizes="(max-width: 768px) 90vw, 560px"
          className="hero-portrait hero-portrait--light"
        />
        <Image
          src="/assets/gauri-twilight-hd.png"
          alt=""
          width={891}
          height={819}
          quality={90}
          loading="eager"
          sizes="(max-width: 768px) 90vw, 560px"
          className="hero-portrait hero-portrait--dark"
        />
      </div>

      <ScrollFade className="hero-intro">
        <h1 className="hero-headline">
          <RevealLines
            lines={[
              "Yo! I’m Gxuri,",
              <Fragment key="line-1">
                a <em>Full Stack Developer</em> And <br /> I Build Stuff
              </Fragment>,
            ]}
          />
        </h1>
      </ScrollFade>
    </section>
  );
}
