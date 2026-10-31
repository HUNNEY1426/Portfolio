import { Fragment } from "react";
import { PageHero } from "@/components/hero/PageHero";
import { JsonLd } from "@/components/common/JsonLd";
import { SITE_URL } from "@/lib/site";
import { ConnectContent } from "@/features/connect/ConnectContent";

export const metadata = {
  alternates: { canonical: "/connect" },
  title: "Contact Gauri Patel (Gxuri) | Full Stack Developer",
  description:
    "Contact Gauri Patel (Gxuri), full stack developer in Ahmedabad, India: email, LinkedIn, GitHub or X. Open to remote roles and collaborations.",
};

export default function ConnectPage() {
  return (
    <div data-page="connect" className="portfolio-route flex flex-col w-full">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${SITE_URL}/connect`,
          name: "Contact Gauri Patel",
          mainEntity: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Gauri Patel", url: SITE_URL },
        }}
      />
      <PageHero
        eyebrow="Say hello"
        title={[
          "Let's build something",
          <Fragment key="line-1">
            <em>quietly remarkable</em>
          </Fragment>,
        ]}
        lede="Collaborating with early-stage teams and established products on digital craft, UI systems and visual development."
        skyFocus="center 62%"
      />
      <ConnectContent />
    </div>
  );
}
