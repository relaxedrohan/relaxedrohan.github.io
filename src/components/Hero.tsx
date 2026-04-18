"use client";

import { motion } from "framer-motion";
import VideoBackground from "./VideoBackground";

const ease = [0.23, 1, 0.32, 1] as [number, number, number, number];

const shadow = "0 2px 16px rgba(0,0,0,0.5), 0 0 4px rgba(0,0,0,0.3)";
const shadowHeavy = "0 4px 30px rgba(0,0,0,0.6), 0 0 8px rgba(0,0,0,0.4)";

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

      <div className="relative z-[2] flex flex-col items-center justify-center text-center min-h-screen px-6" style={{ color: "#ffffff" }}>
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
          I care about intention, performance, and the invisible details that
          make software feel right.
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
            className="pressable glass text-lg font-bold tracking-wide rounded-full px-10 py-3.5 transition-all duration-200"
            style={{ textShadow: shadow }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Work
          </motion.a>
          <motion.a
            href="mailto:rohan@example.com"
            className="pressable glass text-lg font-bold tracking-wide rounded-full px-10 py-3.5 transition-all duration-200"
            style={{ textShadow: shadow }}
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
