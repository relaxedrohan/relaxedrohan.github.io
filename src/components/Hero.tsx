"use client";

import { motion } from "framer-motion";
import VideoBackground from "./VideoBackground";

const ease = [0.23, 1, 0.32, 1] as [number, number, number, number];

const fade = {
  hidden: { opacity: 0, transform: "translateY(20px)", filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    transform: "translateY(0px)",
    filter: "blur(0px)",
    transition: { delay: 0.4 + i * 0.15, duration: 1, ease },
  }),
};


export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <VideoBackground />

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center justify-center text-center min-h-screen px-6">
        <motion.p
          custom={0}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="text-base font-bold tracking-[0.3em] uppercase mb-8 text-white"
          style={{ fontFamily: "var(--font-sans)", textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 1px 8px rgba(0,0,0,0.9)" }}
        >
          Hey, I&apos;m
        </motion.p>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="text-8xl lg:text-9xl font-bold tracking-[-0.04em] leading-[0.9] text-white"
          style={{ fontFamily: "var(--font-sans)", textShadow: "0 4px 40px rgba(0,0,0,0.8), 0 2px 12px rgba(0,0,0,0.9)" }}
        >
          Rohan
        </motion.h1>

        <motion.div
          custom={2}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-2 mt-6"
        >
          {["AI Agents", "Mobile Apps", "Data Intensive Systems", "Web"].map((tag) => (
            <span
              key={tag}
              className="glass text-xs md:text-sm font-semibold text-white/90 rounded-full px-4 py-1.5"
              style={{ fontFamily: "var(--font-sans)", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
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
          className="text-xl md:text-2xl lg:text-3xl font-semibold mt-8 max-w-lg leading-relaxed text-white/90"
          style={{ fontFamily: "var(--font-sans)", textShadow: "0 2px 24px rgba(0,0,0,0.7), 0 1px 8px rgba(0,0,0,0.9)" }}
        >
          I care about intention, performance, and the invisible details that
          make software feel right.
        </motion.p>

        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4 mt-10"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <motion.a
            href="#work"
            className="pressable glass text-base md:text-sm font-semibold tracking-wide text-white rounded-full px-8 py-3 transition-all duration-200"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Work
          </motion.a>
          <motion.a
            href="mailto:rohan@example.com"
            className="pressable glass text-base md:text-sm font-semibold tracking-wide text-white rounded-full px-8 py-3 transition-all duration-200"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Contact
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
