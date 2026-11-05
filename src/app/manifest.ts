import type { MetadataRoute } from "next";

/**
 * Web app manifest: the name and icons used when the site is added to a
 * phone's home screen. Replaces the generator's site.webmanifest, whose
 * icon paths pointed at the site root instead of /assets.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gauri Patel (Gxuri) | Full Stack Developer",
    short_name: "Gxuri",
    description: "Portfolio of Gauri Patel (Gxuri), full stack developer in Ahmedabad, Gujarat.",
    start_url: "/",
    display: "standalone",
    background_color: "#07050e",
    theme_color: "#07050e",
    icons: [
      { src: "/assets/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
