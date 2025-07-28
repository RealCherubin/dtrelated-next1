'use client';
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ProductionAudio from "../components/ProductionAudio";
import { useEffect, useRef, useState } from "react";

// Dot positions for the production room
const dots = [
  { left: "36%", top: "62%", text: "Aloe Vera Inspection Area" },
  { left: "48%", top: "44%", text: "Banana Inspection Area" },
  { left: "60%", top: "32%", text: "Solar Power Source" },
  { left: "70%", top: "54%", text: "Bacteria Syntehsis machine" },
];

export default function Production() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Function to start video
    const playVideo = async () => {
      try {
        await video.play();
        console.log('Production video started playing');
      } catch {
        console.log('Video play failed, user interaction required');
      }
    };

    // Try to auto-play on mount (works on desktop)
    playVideo();

    // Handle user interaction for mobile
    const handleUserInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        playVideo();
        // Remove listeners after first interaction
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('mousedown', handleUserInteraction);
      }
    };

    // Add listeners for user interaction
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('mousedown', handleUserInteraction, { once: true });

    // Cleanup function
    return () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('mousedown', handleUserInteraction);
    };
  }, [hasInteracted]);

  return (
    <>
      <ProductionAudio />
      <div className="relative w-full h-full min-w-max">
        <video
          ref={videoRef}
          src="https://d3t3v3en8zpiwh.cloudfront.net/files%20for%20dt%20related/files%20for%20dt%20related/production.mp4"
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="w-auto h-full object-contain z-0"
        />
        {/* Dots overlay */}
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute group"
            style={{ left: dot.left, top: dot.top }}
          >
            <span className="w-12 h-12 bg-blue-200/40 border border-blue-300/40 rounded-full backdrop-blur-md shadow-lg flex items-center justify-center animate-pulse transition-all duration-300 cursor-pointer relative">
              <span className="w-3 h-3 bg-blue-400/70 rounded-full blur-[2px]" />
              {/* Tooltip */}
              <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-3 py-1 bg-blue-200/90 text-blue-800 text-xs rounded-full shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-30 border border-blue-300/40">
                {dot.text}
              </span>
            </span>
          </div>
        ))}
        {/* Arrow icon near the right edge, vertically centered next to the door */}
        <div
          className="absolute group"
          style={{ right: '6%', top: '38%' }}
        >
          <button
            onClick={() => router.push('/banana-farm')}
            className="w-12 h-12 bg-blue-200/40 border border-blue-300/40 rounded-full backdrop-blur-md shadow-lg flex items-center justify-center animate-pulse transition-all duration-300 cursor-pointer relative"
            aria-label="Go to Banana Farm"
          >
            <ArrowRight className="w-7 h-7 text-blue-500 drop-shadow" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-3 py-1 bg-blue-200/90 text-blue-800 text-xs rounded-full shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-30 border border-blue-300/40">
              Go to Banana Farm
            </span>
          </button>
        </div>
      </div>
    </>
  );
} 