import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

/**
 * Site analytics, switched on by environment variables only:
 *
 * - NEXT_PUBLIC_GA_ID        Google Analytics 4 measurement ID (G-XXXXXXX)
 * - NEXT_PUBLIC_CLARITY_ID   Microsoft Clarity project ID (heatmaps, recordings)
 *
 * Nothing loads in development or when an ID is missing, so local visits
 * never pollute the data. Both IDs are public by design (they appear in
 * every visitor's browser), so they are safe in NEXT_PUBLIC_ variables.
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {clarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(clarityId)});`}
        </Script>
      )}
    </>
  );
}
