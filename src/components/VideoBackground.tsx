"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setMounted(true);

    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const video = videoRef.current;
    if (!video) return;

    setReady(false);

    const handleCanPlay = () => {
      setReady(true);
      video.play().catch(() => {});
    };

    video.addEventListener("canplay", handleCanPlay);
    video.load();

    return () => video.removeEventListener("canplay", handleCanPlay);
  }, [mounted, isMobile]);

  // Resume playback when app returns from background (iOS/Android pause on hide)
  useEffect(() => {
    if (!mounted) return;
    const video = videoRef.current;
    if (!video) return;

    const resume = () => {
      if (document.hidden) return;
      if (video.paused || video.ended) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", resume);
    window.addEventListener("pageshow", resume);
    window.addEventListener("focus", resume);

    return () => {
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("pageshow", resume);
      window.removeEventListener("focus", resume);
    };
  }, [mounted]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    if (!next) video.play().catch(() => {});
    setMuted(next);
  }, []);

  if (!mounted) return null;

  const src = isMobile ? "/hero-portrait.mp4" : "/hero-landscape.mp4";

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover transition-opacity duration-700 video-sway z-0"
        style={{ opacity: ready ? 1 : 0 }}
      />

      <div
        aria-hidden="true"
        className="fixed inset-0 z-1 pointer-events-none bg-black/30"
      />

      {isMobile && ready && (
        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-30 w-10 h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200 pulse-zoom"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 010 14.14" />
              <path d="M15.54 8.46a5 5 0 010 7.07" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
