"use client";

import Hero from "@/components/Hero";
import VideoBackground from "@/components/VideoBackground";

export default function Home() {
  return (
    <>
      <VideoBackground />
      <main className="relative z-2">
        <Hero />
      </main>
    </>
  );
}
