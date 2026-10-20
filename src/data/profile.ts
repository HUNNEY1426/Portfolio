/**
 * Single source of truth for who the site is about and how to get in touch.
 * Every page reads links, the email and the location from here.
 */
export const PROFILE = {
  name: "Gauri Patel",
  handle: "Gxuri",
  role: "Full Stack Developer",
  location: "Ahmedabad, Gujarat",
  country: "IN",
  timezone: "UTC+5:30 (IST)",
  email: "gaureepatel397@gmail.com",
  github: { user: "HUNNEY1426", url: "https://github.com/HUNNEY1426" },
  x: { user: "Honney___1426", url: "https://x.com/Honney___1426" },
  linkedin: { user: "gauri-patel-764912341", url: "https://www.linkedin.com/in/gauri-patel-764912341/" },
  /** The PDF résumé, served from /public (for download). */
  resumePdf: "/Gauri-Patel-Resume.pdf",
  /** The same résumé on Google Drive, embedded as the on-page previewer. */
  resumePreview: "https://drive.google.com/file/d/1fUqyerIkpVMx7C4UwMYZAYayB7jSLzMQ/preview",
} as const;

export const MAILTO = `mailto:${PROFILE.email}`;
