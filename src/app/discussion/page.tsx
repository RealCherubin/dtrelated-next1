'use client';
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import DiscussionAudio from "../components/DiscussionAudio";
import { useEffect, useRef } from "react";

// Dot positions for the top-down table view
const dots = [
  { left: "18%", top: "70%", text: "Towel Stack" },
  { left: "32%", top: "32%", text: "Natural fibres under study" },
  { left: "52%", top: "48%", text: "Aloe Vera plant" },
  { left: "70%", top: "65%", text: "Glassware" },
];

export default function Discussion() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Force autoplay with multiple attempts
      const playVideo = async () => {
        try {
          await video.play();
        } catch {
          console.log('Autoplay failed, retrying...');
          // Retry after a short delay
          setTimeout(async () => {
            try {
              await video.play();
            } catch {
              console.log('Autoplay retry failed');
            }
          }, 100);
        }
      };

      // Attempt to play when video is loaded
      if (video.readyState >= 2) {
        playVideo();
      } else {
        video.addEventListener('loadeddata', playVideo);
      }

      // Also try to play when the page becomes visible
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          playVideo();
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        video.removeEventListener('loadeddata', playVideo);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, []);

  return (
    <>
      <DiscussionAudio />
      <div className="relative w-full h-full min-w-max">
        <video
          ref={videoRef}
          src="https://d3t3v3en8zpiwh.cloudfront.net/files%20for%20dt%20related/files%20for%20dt%20related/discussion.mp4"
          autoPlay
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
        {/* Arrow icon near the right edge, vertically centered on the table */}
        <div
          className="absolute group"
          style={{ right: '6%', top: '48%' }}
        >
          <button
            onClick={() => router.push('/production')}
            className="w-12 h-12 bg-blue-200/40 border border-blue-300/40 rounded-full backdrop-blur-md shadow-lg flex items-center justify-center animate-pulse transition-all duration-300 cursor-pointer relative"
            aria-label="Go to Production"
          >
            <ArrowRight className="w-7 h-7 text-blue-500 drop-shadow" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-3 py-1 bg-blue-200/90 text-blue-800 text-xs rounded-full shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-30 border border-blue-300/40">
              Go to Production
            </span>
          </button>
        </div>
      </div>
    </>
  );
} 