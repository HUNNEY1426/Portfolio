"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

const TOP_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/connect", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * One pill on every screen size. On phones the links tighten up (smaller
 * type and padding) so all five fit comfortably down to 320px wide.
 */
export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-40 pt-3 sm:pt-4 md:pt-5 pointer-events-none"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-2 sm:px-gutter md:px-gutter-desktop pointer-events-auto">
        <nav
          aria-label="Main navigation"
          className={cn(
            "site-nav flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 rounded-full select-none",
            isScrolled && "site-nav--scrolled"
          )}
        >
          {TOP_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="site-nav-link font-body text-[12.5px] sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full cursor-pointer"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}
