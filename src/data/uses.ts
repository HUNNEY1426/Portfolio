/** What Gauri works with: hardware and everyday software, with links. */

export interface UseItem {
  name: string;
  detail: string;
  href: string;
}

export const HARDWARE: UseItem[] = [
  {
    name: "ASUS TUF Gaming F15",
    detail: "11th Gen Intel Core i5 H-series · NVIDIA RTX 2050, 4 GB",
    href: "https://www.asus.com/in/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-f15-2021/",
  },
  {
    name: "Motorola moto g96 5G",
    detail: "Phone",
    href: "https://www.motorola.com/we/",
  },
  {
    name: "Cosmic Byte Artemis",
    detail: "68-key mechanical keyboard",
    href: "https://www.thecosmicbyte.com/product/cosmic-byte-artemis-68-key-per-key-rgb-mechanical-gaming-keyboard/",
  },
  {
    name: "HP Wireless Mouse",
    detail: "Mouse",
    href: "https://www.hp.com/in-en/shop/hp-wireless-mouse-200-z3r35aa.html",
  },
];

export const SOFTWARE: UseItem[] = [
  { name: "VS Code", detail: "Editor", href: "https://code.visualstudio.com/" },
  { name: "Cursor", detail: "AI editor", href: "https://cursor.com/" },
  { name: "Claude Code", detail: "AI coding", href: "https://claude.com/product/claude-code" },
  { name: "Antigravity", detail: "AI coding", href: "https://antigravity.google/" },
  { name: "Figma", detail: "Design", href: "https://www.figma.com/" },
  { name: "Postman", detail: "API testing", href: "https://www.postman.com/" },
  { name: "Vercel", detail: "Hosting", href: "https://vercel.com/" },
];
