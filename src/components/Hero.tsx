"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const shadow = "0 2px 16px rgba(0,0,0,0.5), 0 0 4px rgba(0,0,0,0.3)";
const shadowHeavy = "0 4px 30px rgba(0,0,0,0.6), 0 0 8px rgba(0,0,0,0.4)";

const fade = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.07, duration: 0.5, ease },
  }),
};

const pulseTransition = {
  duration: 2,
  repeat: Infinity,
  ease: "easeInOut" as const,
  delay: 1,
};
const springTransition = { type: "spring" as const, stiffness: 400, damping: 17 };
const tooltipClass =
  "pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full glass px-3 py-1.5 text-xs font-semibold tracking-wide opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      <div
        className="relative z-2 flex flex-col items-center justify-center text-center min-h-screen px-6"
        style={{ color: "#ffffff" }}
      >
        <motion.p
          custom={0}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="text-lg font-bold tracking-[0.3em] uppercase mb-4"
          style={{ textShadow: shadow }}
        >
          Hey, I&apos;m
        </motion.p>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="text-9xl lg:text-[10rem] font-bold tracking-[-0.04em] leading-[0.85] mobile-text-pop"
          style={{ textShadow: shadowHeavy }}
        >
          Rohan
        </motion.h1>

        <motion.div
          custom={2}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-2.5 mt-6"
        >
          {["AI Agents", "Mobile Apps", "Data Intensive Systems", "Web"].map((tag) => (
            <span
              key={tag}
              className="glass text-base font-bold rounded-full px-5 py-2"
              style={{ textShadow: shadow }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.p
          custom={3}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="text-2xl lg:text-3xl font-semibold leading-snug text-balance mt-8 max-w-sm md:max-w-lg"
          style={{ textShadow: shadow }}
        >
          I care about simplicity, performance, reliability, and the beautiful invisible details.
        </motion.p>

        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 mt-10"
        >
          <motion.a
            href="#work"
            className="group pressable glass text-lg font-bold tracking-wide rounded-full px-10 py-3.5 transition-all duration-200 relative"
            style={{ textShadow: shadow }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={pulseTransition}
            whileHover={{ scale: 1.12, transition: springTransition }}
            whileTap={{ scale: 0.97, transition: springTransition }}
          >
            Work
            <span aria-hidden="true" className={tooltipClass} style={{ textShadow: shadow }}>
              See what I&apos;ve shipped
            </span>
          </motion.a>

          <IconLink href="mailto:rohanyadavdec@gmail.com" label="Send email">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </IconLink>

          <IconLink href="https://www.linkedin.com/in/relaxedrohan/" label="View LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </IconLink>

          <IconLink href="https://github.com/relaxedrohan" label="View GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.95c.58.1.79-.25.79-.56v-2c-3.26.71-3.94-1.4-3.94-1.4-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.71.08-.71 1.18.08 1.8 1.21 1.8 1.21 1.04 1.79 2.74 1.27 3.41.97.1-.76.41-1.27.74-1.56-2.6-.3-5.34-1.3-5.34-5.77 0-1.28.46-2.32 1.2-3.14-.12-.3-.52-1.5.12-3.12 0 0 .98-.31 3.2 1.2a11.1 11.1 0 015.83 0c2.22-1.51 3.2-1.2 3.2-1.2.64 1.62.24 2.82.12 3.12.75.82 1.2 1.86 1.2 3.14 0 4.48-2.75 5.46-5.37 5.75.42.37.8 1.1.8 2.22v3.29c0 .32.21.68.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </IconLink>
        </motion.div>
      </div>
    </section>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group pressable glass rounded-full w-13 h-13 flex items-center justify-center text-white/90 hover:text-white transition-colors duration-200 relative"
      animate={{ scale: [1, 1.12, 1] }}
      transition={pulseTransition}
      whileHover={{ scale: 1.18, y: -2, transition: springTransition }}
      whileTap={{ scale: 0.95, transition: springTransition }}
    >
      {children}
      <span aria-hidden="true" className={tooltipClass} style={{ textShadow: shadow }}>
        {label}
      </span>
    </motion.a>
  );
}
