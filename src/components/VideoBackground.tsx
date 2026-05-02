"use client";

import { useRef, useState, useEffect, useCallback, useSyncExternalStore } from "react";

function useIsMobile(): boolean | null {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb, { passive: true });
      return () => window.removeEventListener("resize", cb);
    },
    () => window.innerWidth < 768,
    () => null,
  );
}

export default function VideoBackground() {
  const isMobile = useIsMobile();

  if (isMobile === null) return null;

  const videoSrc = isMobile ? "/hero-portrait.mp4" : "/hero-landscape.mp4";
  const posterSrc = isMobile ? "/hero-portrait.jpg" : "/hero-landscape.jpg";

  return (
    <>
      <VideoLayer key={videoSrc} src={videoSrc} poster={posterSrc} isMobile={isMobile} />
      <div aria-hidden="true" className="fixed inset-0 z-1 pointer-events-none bg-black/30" />
    </>
  );
}

function VideoLayer({ src, poster, isMobile }: { src: string; poster: string; isMobile: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      const result = video.play();
      if (result && typeof result.then === "function") {
        result.then(() => setReady(true)).catch(() => setFallback(true));
      } else {
        setReady(true);
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.load();

    return () => video.removeEventListener("canplay", handleCanPlay);
  }, []);

  // Resume playback when app returns from background (iOS/Android pause on hide).
  // A failed resume play() is non-permanent (e.g. Safari Private Browsing rejects
  // programmatic play after lock/unlock) — leave the video paused so the user can
  // tap to recover, instead of swapping to the static fallback.
  useEffect(() => {
    if (fallback) return;
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
  }, [fallback]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
    // A user tap is a play gesture — also use it to recover from a paused state
    // left behind by a failed resume. If unmuted play is rejected, revert to muted.
    video.play().catch(() => {
      if (!next) {
        video.muted = true;
        setMuted(true);
      }
    });
  }, []);

  if (fallback) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className="fixed inset-0 w-full h-full object-cover z-0"
      />
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover transition-opacity duration-700 video-sway z-0"
        style={{ opacity: ready ? 1 : 0 }}
      />

      {isMobile && ready && (
        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-30 w-10 h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200 pulse-zoom"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
